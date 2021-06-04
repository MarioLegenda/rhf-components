import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { UncontrolledInput } from '../components/UncontrolledInput';

import * as styles from '../components/styles/TextInput.styles';

interface FormValues {
  acceptTerms: boolean;
  name: string;
  lastName: string;
  radioButton: string;
  description: string;
}

const TestingGround: React.FC = () => {
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
          <UncontrolledInput<string>
            containerStyles={styles.container}
            inputStyles={styles.input}
            name="name"
            type="text"
            placeholder="Name"
            reactiveHandlers={[
              (value) => console.log('REACTIVE HANDLER 1 EXECUTED', value),
              (value) => console.log('REACTIVE HANDLER 2 EXECUTED', value),
            ]}
            reactiveErrorHandler={(value) =>
              console.log('REACTIVE ERROR HANDLER', value)
            }
            onChangeHandler={(value, isValid) =>
              console.log('OnChangeHandler', value, isValid)
            }
          />

          <UncontrolledInput<string>
            containerStyles={styles.container}
            inputStyles={styles.input}
            name="lastName"
            type="text"
            placeholder="Last name"
          />

          <UncontrolledInput<boolean>
            name="acceptTerms"
            type="checkbox"
            value={false}
          />

          <UncontrolledInput<string>
            name="description"
            type="textarea"
            value=""
          />

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TestingGround;
