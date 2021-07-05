import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { CoreInput } from '../shared/CoreInput';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';
import { CoreTextarea } from '../shared/CoreTextare';

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  name: string;
  type: 'text' | 'checkbox' | 'radio' | 'textarea' | 'password';
  constraints?: RegisterOptions;
  containerStyles?: SerializedStyles | SerializedStyles[];
  inputStyles?: SerializedStyles | SerializedStyles[];
}

type ExtendedInput = TextareaProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export function SimpleInput({
  name,
  constraints,
  containerStyles,
  inputStyles,
  type,
  ...rest
}: ExtendedInput): React.ReactElement {
  const { register } = useFormContext();

  if (type !== 'textarea') {
    return (
      <CoreInput
        containerStyles={containerStyles}
        inputStyles={inputStyles}
        registerOptions={register(name, constraints)}
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
        registerOptions={register(name, constraints)}
        name={name}
        {...rest}
      />
    );
  }
}
