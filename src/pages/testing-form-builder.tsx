import React from 'react';
import { UncontrolledInput } from '../components/UncontrolledInput';

import * as styles from '../components/styles/TextInput.styles';
import { FormBuilder } from '../components/FormBuilder';

interface FormValues {
  acceptTerms: boolean;
  name: string;
  lastName: string;
  radioButton: string;
  description: string;
}

interface TransformedFormValues {
  name: { value: string; type: string };
  lastName: { value: string; type: string };
}

const TestingFormBuilder: React.FC = () => {
  const onSubmit = (data: TransformedFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <FormBuilder<FormValues, TransformedFormValues>
        onSubmit={onSubmit}
        transformers={[
          async (data: FormValues) => {
            return {
              name: { value: data.name, type: 'name' },
              lastName: { value: data.lastName, type: 'lastName' },
            };
          },
        ]}
        component={() => (
          <>
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
          </>
        )}
      />
    </div>
  );
};

export default TestingFormBuilder;
