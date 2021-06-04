import React, { InputHTMLAttributes } from 'react';
import {
  useFormContext,
  UseFormRegisterReturn,
  useWatch,
} from 'react-hook-form';
import { css, SerializedStyles } from '@emotion/react';

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue'
  > {
  name: string;
  component: (value: boolean) => React.ReactNode;
  registerOptions?: UseFormRegisterReturn;
  defaultValue?: string | number | ReadonlyArray<string>;
  containerStyles?: SerializedStyles | SerializedStyles[];
  inputStyles?: SerializedStyles | SerializedStyles[];
  type: 'text' | 'checkbox' | 'radio';
}

export const CustomCheckbox: React.FC<Props> = ({
  name,
  registerOptions,
  defaultValue,
  containerStyles,
  inputStyles,
  component,
  type,
  ...rest
}) => {
  const resolvedRegisterOptions = registerOptions ? registerOptions : {};
  const { control } = useFormContext();

  const watchedValue = useWatch({
    control,
    name: name,
    defaultValue: defaultValue,
  });

  return (
    <>
      <div
        css={[
          containerStyles,
          css`
            input {
              display: none;
            }
          `,
        ]}
      >
        {component(watchedValue)}
        <input
          type={type}
          name={name}
          {...resolvedRegisterOptions}
          defaultValue={defaultValue}
          {...rest}
        />
      </div>
    </>
  );
};
