import { useEffect, useState } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import { UseFormSetError } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types';

export type ReactiveHandler<T> = (value: T) => void;

export type ReactiveErrorHandler = (
  values: FieldValues,
  setError: UseFormSetError<FieldValues>,
) => void;

export type OnChangeHandler<T> = (value: T, isValid: boolean) => void;

export function useUncontrolledForm<T>(
  name: string,
  value?: T,
  validateOnChange = false,
  constraints?: RegisterOptions,
  onChangeHandler?: OnChangeHandler<T>,
  reactiveHandlers?: ReactiveHandler<T>[],
  reactiveErrorHandler?: ReactiveErrorHandler,
) {
  const { setValue, trigger, control, register, setError, getValues } =
    useFormContext();
  const [isFirstOnChange, setIsFirstOnChange] = useState(true);
  const watchedValue = useWatch({
    control,
    name: name,
    defaultValue: value,
  });

  useEffect(() => {
    if (onChangeHandler && !isFirstOnChange && !validateOnChange) {
      onChangeHandler(watchedValue ? watchedValue : '', true);
    }

    if (onChangeHandler && !isFirstOnChange && validateOnChange) {
      trigger(name).then((isValid) =>
        onChangeHandler(watchedValue ? watchedValue : '', isValid),
      );
    }

    if (
      validateOnChange &&
      !isFirstOnChange &&
      !onChangeHandler &&
      !reactiveErrorHandler
    ) {
      trigger(name);
    }

    if (isFirstOnChange) {
      setIsFirstOnChange(false);
    }

    if (Array.isArray(reactiveHandlers)) {
      for (const handler of reactiveHandlers) {
        handler(watchedValue);
      }
    }

    if (reactiveErrorHandler) {
      if (validateOnChange) {
        trigger(name).then(() => {
          reactiveErrorHandler(watchedValue, setError);
        });

        return;
      }

      const values = getValues();
      values[name] = watchedValue;
      reactiveErrorHandler(values, setError);
    }
  }, [watchedValue]);

  useEffect(() => {
    setValue(name, value);
  }, [value]);

  return register(name, constraints);
}
