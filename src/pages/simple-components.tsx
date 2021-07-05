import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { SimpleInput } from '../components/simple/SimpleInput';

import * as styles from '../components/styles/TextInput.styles';
import { UncontrolledInput } from '../components/complex/UncontrolledInput';

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

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleInput
            name="name"
            type="checkbox"
            placeholder="Name"
            constraints={{ required: true }}
          />

          <UncontrolledInput<string>
            name="lastName"
            value=""
            type="text"
            validateOnChange
            placeholder="LastName"
            onChangeHandler={(value, isValid) =>
              console.log('OnChangeHandler', value, isValid)
            }
          />

          <UncontrolledInput<string>
            name="check"
            value=""
            type="text"
            validateOnChange
            constraints={{ required: true }}
            placeholder="Check"
            onChangeHandler={(value, isValid) =>
              console.log('OnChangeHandler', value, isValid)
            }
            reactiveErrorHandler={(values, setError) => {
              if (values.lastName !== 'vrijednost') {
                setError('check', {
                  type: 'manual',
                  message: 'lastName should be vrijednost',
                });
              }
            }}
          />

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TestingGround;
