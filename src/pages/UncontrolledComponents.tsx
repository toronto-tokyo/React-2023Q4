import { schema } from '../Validations/formsValidation';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';
import classes from '../styles/UncontrolledComponents.module.css';
import { ValidationError } from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { changeUncontrolledFormData } from '../redux/reducers/formsDataSlice';

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

export interface IFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: string;
  imgFile: File;
  country: string;
}

function UncontrolledComponents() {
  const [validationErrors, setValidationErrors] = useState<IValidationErrors>(
    {}
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    try {
      await schema.validate(formData, {
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
    const typedFormData = formData as unknown as IFormData;
    const imgFile = typedFormData.imgFile;
    const reader = new FileReader();
    reader.onload = () => {
      const base64Img = reader.result as string;
      dispatch(
        changeUncontrolledFormData({ ...typedFormData, imgFile: base64Img })
      );
      navigate('/');
    };
    reader.readAsDataURL(imgFile);
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
