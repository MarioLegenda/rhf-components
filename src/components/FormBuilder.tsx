import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form/dist/types';
import { useForm, FormProvider } from 'react-hook-form';
import React from 'react';

type Transformer<T, F> = (value: T | FieldValues) => F;

type ExtendedType<T, F> = UseFormProps<T, any> & {
  component: (form: UseFormReturn<T>) => React.ReactNode;
  onSubmit: SubmitHandler<F>;
  transformers?: Transformer<T, F>[];
};

export function FormBuilder<T = FieldValues, F = any>({
  mode,
  reValidateMode,
  resolver,
  context,
  defaultValues,
  shouldFocusError,
  shouldUnregister,
  criteriaMode,
  component,
  onSubmit,
  transformers,
}: ExtendedType<T, F>) {
  const methods = useForm<T>({
    context: context,
    mode: mode,
    reValidateMode: reValidateMode,
    shouldFocusError: shouldFocusError,
    shouldUnregister: shouldUnregister,
    resolver: resolver,
    criteriaMode: criteriaMode,
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  console.log(component);

  const onInternalSubmit = async (data: T | FieldValues) => {
    let result = data;

    if (transformers) {
      for (const transformer of transformers) {
        result = await transformer(data);
      }
    }

    onSubmit(result);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onInternalSubmit)}>
        {component(methods)}
      </form>
    </FormProvider>
  );
}
