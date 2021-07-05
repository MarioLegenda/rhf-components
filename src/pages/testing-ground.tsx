import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { UncontrolledInput } from '../components/complex/UncontrolledInput';

import * as styles from '../components/styles/TextInput.styles';
import { ControllerCheckbox } from '../components/complex/ControllerCheckbox';

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

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TestingGround;
