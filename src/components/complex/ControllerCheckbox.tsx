import React, { InputHTMLAttributes, useState } from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import { css, SerializedStyles } from '@emotion/react';

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue'
  > {
  name: string;
  component: (value: boolean) => React.ReactNode;
  constraints?: RegisterOptions;
  value?: boolean;
  containerStyles?: SerializedStyles | SerializedStyles[];
}

export const ControllerCheckbox: React.FC<Props> = ({
  name,
  constraints,
  value = false,
  containerStyles,
  component,
  ...rest
}) => {
  const { control } = useFormContext();
  const [isChecked, setIsChecked] = useState(value);

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
        <Controller
          name={name}
          control={control}
          rules={constraints}
          render={({ field: { onChange } }) => {
            return (
              <input
                {...rest}
                checked={value}
                id={`checkbox-${name}`}
                type="checkbox"
                name={name}
                onChange={() => {
                  onChange(!isChecked);
                  setIsChecked(!isChecked);
                }}
              />
            );
          }}
        />
        {component(isChecked)}
      </div>
    </>
  );
};
