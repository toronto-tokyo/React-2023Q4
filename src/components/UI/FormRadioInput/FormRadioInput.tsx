import classes from './FormRadioInput.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  id: string;
  label: string;
  value: string;
  name?: string;
  type: string;
  register?: UseFormRegisterReturn;
}

function FormRadioInputs({ id, label, value, name, type, register }: IProps) {
  return (
    <div className={classes.formRadioInputWrap}>
      <label htmlFor={id}>{label}</label>
      {register ? (
        <input id={id} type={type} value={value} {...register}></input>
      ) : (
        <input id={id} type={type} value={value} name={name}></input>
      )}
    </div>
  );
}

export default FormRadioInputs;
