import { useEffect, useState } from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import { UseFormSetError } from 'react-hook-form/dist/types/form';
import { FieldValues } from 'react-hook-form/dist/types';

export type ReactiveHandler<T> = (value: T) => void;

export type ReactiveErrorHandler<T> = (
  value: T,
  setError: UseFormSetError<FieldValues>,
) => void;

export type OnChangeHandler<T> = (value: T, isValid: boolean) => void;

export function useUncontrolledForm<T>(
  name: string,
  value?: T,
  constraints?: RegisterOptions,
  onChangeHandler?: OnChangeHandler<T>,
  reactiveHandlers?: ReactiveHandler<T>[],
  reactiveErrorHandler?: ReactiveErrorHandler<T>,
) {
  const { setValue, trigger, control, register, setError } = useFormContext();
  const [isFirstOnChange, setIsFirstOnChange] = useState(true);
  const watchedValue = useWatch({
    control,
    name: name,
    defaultValue: value,
  });

  useEffect(() => {
    if (onChangeHandler && !isFirstOnChange && !constraints) {
      onChangeHandler(watchedValue ? watchedValue : '', true);
    }

    if (onChangeHandler && !isFirstOnChange && constraints) {
      trigger(name).then((isValid) =>
        onChangeHandler(watchedValue ? watchedValue : '', isValid),
      );
    }

    if (constraints && !onChangeHandler && !reactiveErrorHandler) {
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
      trigger(name).then(() => {
        reactiveErrorHandler(watchedValue, setError);
      });
    }
  }, [watchedValue]);

  useEffect(() => {
    setValue(name, value);
  }, [value]);

  return register(name, constraints);
}
