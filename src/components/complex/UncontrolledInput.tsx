import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { CoreInput } from '../shared/CoreInput';

import {
  OnChangeHandler,
  ReactiveErrorHandler,
  ReactiveHandler,
  useUncontrolledForm,
} from '../hooks/useUncontrolledForm';
import { RegisterOptions } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';
import { CoreTextarea } from '../shared/CoreTextare';

interface TextareaProps<T>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  name: string;
  type: 'text' | 'checkbox' | 'radio' | 'textarea' | 'select' | 'password';
  value?: T;
  constraints?: RegisterOptions;
  validateOnChange?: boolean;
  onChangeHandler?: OnChangeHandler<T>;
  reactiveHandlers?: ReactiveHandler<T>[];
  reactiveErrorHandler?: ReactiveErrorHandler;
  containerStyles?: SerializedStyles | SerializedStyles[];
  inputStyles?: SerializedStyles | SerializedStyles[];
}

type ExtendedInput<T> = TextareaProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export function UncontrolledInput<T>({
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
}: ExtendedInput<T>): React.ReactElement {
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
