import React from 'react';
import { Input } from '../components/Input';

import * as styles from '../components/styles/TextInput.styles';
import { BasicFormBuilder } from '../components/hooks/BasicFormBuilder';

interface FormValues {
  acceptTerms: boolean;
  name: string;
  lastName: string;
  radioButton: string;
  description: string;
}

const BasicFormBuilderComponent: React.FC = () => {
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <BasicFormBuilder<FormValues> onSubmit={onSubmit}>
        <Input<string>
          containerStyles={styles.container}
          inputStyles={styles.input}
          name="name"
          type="text"
          placeholder="Name"
        />
      </BasicFormBuilder>
    </div>
  );
};

export default BasicFormBuilderComponent;
