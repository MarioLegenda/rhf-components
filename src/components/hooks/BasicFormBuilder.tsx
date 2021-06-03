import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form/dist/types';
import { useForm, FormProvider } from 'react-hook-form';
import React from 'react';

type ExtendedType<T> = UseFormProps<T, any> & {
  children: React.ReactChild;
  onSubmit: SubmitHandler<T>;
};

export function BasicFormBuilder<T = FieldValues>({
  mode,
  reValidateMode,
  resolver,
  context,
  defaultValues,
  shouldFocusError,
  shouldUnregister,
  criteriaMode,
  children,
  onSubmit,
}: ExtendedType<T>) {
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
