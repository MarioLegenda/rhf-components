import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { CoreInput } from './CoreInput';

import {
  OnChangeHandler,
  ReactiveErrorHandler,
  ReactiveHandler,
  useUncontrolledForm,
} from './hooks/useUncontrolledForm';
import { RegisterOptions } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';
import { CoreTextarea } from './CoreTextare';

interface TextareaProps<T>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  name: string;
  type: 'text' | 'checkbox' | 'radio' | 'textarea';
  value?: T;
  constraints?: RegisterOptions;
  validateOnChange?: boolean;
  onChangeHandler?: OnChangeHandler<T>;
  reactiveHandlers?: ReactiveHandler<T>[];
  reactiveErrorHandler?: ReactiveErrorHandler<T>;
  containerStyles?: SerializedStyles | SerializedStyles[];
  inputStyles?: SerializedStyles | SerializedStyles[];
}

type ExtendedInput<T> = TextareaProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export function UncontrolledInput<
  T,
  F extends ExtendedInput<T> = ExtendedInput<T>,
>({
  name,
  constraints,
  value,
  onChangeHandler,
  validateOnChange,
  reactiveHandlers,
  reactiveErrorHandler,
  containerStyles,
  inputStyles,
  type,
  ...rest
}: F): React.ReactElement {
  const register = useUncontrolledForm<T>(
    name,
    value,
    validateOnChange,
    constraints,
    onChangeHandler,
    reactiveHandlers,
    reactiveErrorHandler,
  );

  if (type !== 'textarea') {
    return (
      <CoreInput
        containerStyles={containerStyles}
        inputStyles={inputStyles}
        registerOptions={register}
        name={name}
        type={type}
        {...rest}
      />
    );
  } else {
    return (
      <CoreTextarea
        containerStyles={containerStyles}
        inputStyles={inputStyles}
        registerOptions={register}
        name={name}
        {...rest}
      />
    );
  }
}
