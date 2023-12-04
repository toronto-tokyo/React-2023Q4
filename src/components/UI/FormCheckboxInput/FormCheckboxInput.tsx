import classes from './FromCheckboxInput.module.css';
import FormErrorLine from '../../FormErrorLine/FormErrorLine';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  id: string;
  label: string;
  value?: string;
  name?: string;
  type: string;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
}

function FormCheckboxInput({
  id,
  label,
  value,
  name,
  type,
  errorMessage,
  register,
}: IProps) {
  return (
    <div>
      <div className={classes.formCheckboxInputWrap}>
        <label htmlFor={id}>{label}</label>
        {register ? (
          <input id={id} type={type} value={value} {...register}></input>
        ) : (
          <input id={id} type={type} value={value} name={name}></input>
        )}
      </div>
      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
    </div>
  );
}

export default FormCheckboxInput;
