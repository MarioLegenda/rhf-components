import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue'
  > {
  name: string;
  registerOptions?: UseFormRegisterReturn;
  defaultValue?: string | number | ReadonlyArray<string>;
  containerStyles?: SerializedStyles | SerializedStyles[];
  inputStyles?: SerializedStyles | SerializedStyles[];
  type: 'text' | 'checkbox' | 'radio' | 'textarea' | 'select' | 'password';
}

export const CoreInput: React.FC<Props> = ({
  name,
  registerOptions,
  defaultValue,
  containerStyles,
  inputStyles,
  type,
  ...rest
}) => {
  const resolvedRegisterOptions = registerOptions ? registerOptions : {};

  return (
    <>
      <div css={containerStyles}>
        <input
          type={type}
          name={name}
          css={inputStyles}
          {...resolvedRegisterOptions}
          defaultValue={defaultValue}
          {...rest}
        />
      </div>
    </>
  );
};
