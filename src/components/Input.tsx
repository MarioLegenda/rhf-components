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
import { CustomCheckbox } from './CustomCheckbox';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  view?: 'native' | 'custom';
}

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

type ExtendedInput<T> = TextareaProps<T> & InputProps;

export function Input<T, F extends ExtendedInput<T> = ExtendedInput<T>>({
  name,
  constraints,
  value,
  onChangeHandler,
  reactiveHandlers,
  reactiveErrorHandler,
  containerStyles,
  inputStyles,
  type,
  view,
  ...rest
}: F): React.ReactElement {
  const register = useUncontrolledForm<T>(
    name,
    value,
    constraints,
    onChangeHandler,
    reactiveHandlers,
    reactiveErrorHandler,
  );

  if (type !== 'textarea') {
    if (type === 'checkbox' && view === 'custom') {
      return (
        <CustomCheckbox
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
        <CoreInput
          containerStyles={containerStyles}
          inputStyles={inputStyles}
          registerOptions={register}
          name={name}
          type={type}
          {...rest}
        />
      );
    }
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
