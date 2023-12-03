import FormErrorLine from '../../FormErrorLine/FormErrorLine';
import classes from './FormInput.module.css';

interface IProps {
  id: string;
  label: string;
  type: string;
  name: string;
  errorMessage?: string;
}

function FormInput({ id, label, type, name, errorMessage }: IProps) {
  return (
    <div>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input name={name} id={id} className={classes.formInput} type={type} />
      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
    </div>
  );
}

export default FormInput;
