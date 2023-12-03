import { schema } from '../Validations/formsValidation';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';
import classes from '../styles/UncontrolledComponents.module.css';
import { ValidationError } from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IValidationErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  acceptTC?: string;
  imgFile?: string;
  country?: string;
}

function UncontrolledComponents() {
  const [validationErrors, setValidationErrors] = useState<IValidationErrors>(
    {}
  );
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await schema.validate(Object.fromEntries(formData.entries()), {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setValidationErrors(validationErrors);
      }
      return;
    }
    navigate('/');
  };

  return (
    <main className={classes.main}>
      <UncontrolledForm
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
      />
    </main>
  );
}

export default UncontrolledComponents;
