import FormErrorLine from '../../FormErrorLine/FormErrorLine';
import classes from './FormFileInput.module.css';

interface IProps {
  id: string;
  label: string;
  name: string;
  errorMessage?: string;
  accept?: string;
}

function FormFileInput({ id, label, name, errorMessage, accept }: IProps) {
  return (
    <div>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input type="file" name={name} accept={accept} />
      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
    </div>
  );
}

export default FormFileInput;
