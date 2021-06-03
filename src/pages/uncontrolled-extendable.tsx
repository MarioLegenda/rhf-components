import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '../components/Input';

import * as styles from '../components/styles/TextInput.styles';

interface FormValues {
  acceptTerms: boolean;
  name: string;
  lastName: string;
  radioButton: string;
  description: string;
}

const UncontrolledExtendable: React.FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      acceptTerms: false,
      radioButton: '',
      description: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<string>
            containerStyles={styles.container}
            inputStyles={styles.input}
            name="name"
            type="text"
            placeholder="Name"
          />

          <Input<string>
            containerStyles={styles.container}
            inputStyles={styles.input}
            name="lastName"
            type="text"
            placeholder="Last name"
          />

          <Input<boolean> name="acceptTerms" type="checkbox" value={false} />

          <Input<string> name="description" type="textarea" value="" />

          <Input name="middleName" type="checkbox" />

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UncontrolledExtendable;
