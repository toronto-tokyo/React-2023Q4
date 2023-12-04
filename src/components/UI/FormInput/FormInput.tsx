import FormErrorLine from '../../FormErrorLine/FormErrorLine';
import classes from './FormInput.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  id: string;
  label: string;
  type: string;
  name?: string;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
}

function FormInput({ id, label, type, name, errorMessage, register }: IProps) {
  return (
    <div>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      {register ? (
        <input
          id={id}
          className={classes.formInput}
          type={type}
          {...register}
        />
      ) : (
        <input name={name} id={id} className={classes.formInput} type={type} />
      )}
      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
    </div>
  );
}

export default FormInput;
