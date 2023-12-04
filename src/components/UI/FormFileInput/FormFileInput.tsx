import FormErrorLine from '../../FormErrorLine/FormErrorLine';
import classes from './FormFileInput.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  id: string;
  label: string;
  name: string;
  errorMessage?: string;
  accept?: string;
  register?: UseFormRegisterReturn;
}

function FormFileInput({
  id,
  label,
  name,
  errorMessage,
  accept,
  register,
}: IProps) {
  return (
    <div>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      {register ? (
        <input type="file" {...register} accept={accept} />
      ) : (
        <input type="file" name={name} accept={accept} />
      )}
      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
    </div>
  );
}

export default FormFileInput;
