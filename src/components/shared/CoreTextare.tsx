import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'defaultValue'
  > {
  name: string;
  registerOptions?: UseFormRegisterReturn;
  defaultValue?: string | number | ReadonlyArray<string>;
  containerStyles?: SerializedStyles | SerializedStyles[];
  inputStyles?: SerializedStyles | SerializedStyles[];
}

export const CoreTextarea: React.FC<Props> = ({
  name,
  registerOptions,
  defaultValue,
  containerStyles,
  inputStyles,
  ...rest
}) => {
  const resolvedRegisterOptions = registerOptions ? registerOptions : {};

  return (
    <>
      <div css={containerStyles}>
        <textarea
          name={name}
          css={inputStyles}
          {...resolvedRegisterOptions}
          {...rest}
        >
          {defaultValue}
        </textarea>
      </div>
    </>
  );
};
