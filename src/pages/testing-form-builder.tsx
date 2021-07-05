import React from 'react';
import { UncontrolledInput } from '../components/complex/UncontrolledInput';

import * as styles from '../components/styles/TextInput.styles';
import { FormBuilder } from '../components/shared/FormBuilder';

interface FormValues {
  name: string;
  lastName: string;
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
      <FormBuilder<TransformedFormValues, FormValues>
        onSubmit={onSubmit}
        defaultValues={{
          name: '',
          lastName: '',
        }}
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
              value=""
              type="text"
              placeholder="Name"
              reactiveHandlers={[
                (value) => console.log('REACTIVE HANDLER 1 EXECUTED', value),
                (value) => console.log('REACTIVE HANDLER 2 EXECUTED', value),
              ]}
              reactiveErrorHandler={(values, setError) =>
                console.log('REACTIVE ERROR HANDLER', values)
              }
              onChangeHandler={(value, isValid) =>
                console.log('OnChangeHandler', value, isValid)
              }
            />

            <UncontrolledInput<string>
              containerStyles={styles.container}
              inputStyles={styles.input}
              name="lastName"
              value=""
              type="text"
              placeholder="Last name"
              reactiveHandlers={[
                (value) => console.log('REACTIVE HANDLER 1 EXECUTED', value),
                (value) => console.log('REACTIVE HANDLER 2 EXECUTED', value),
              ]}
              reactiveErrorHandler={(value, setError) =>
                console.log('REACTIVE ERROR HANDLER', value)
              }
              onChangeHandler={(values, isValid) =>
                console.log('OnChangeHandler', values, isValid)
              }
            />

            <button type="submit">Submit</button>
          </>
        )}
      />
    </div>
  );
};

export default TestingFormBuilder;
