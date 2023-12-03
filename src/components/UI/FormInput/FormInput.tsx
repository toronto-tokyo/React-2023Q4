import classes from './FormInput.module.css';

interface IProps {
  id: string;
  label: string;
  type: string;
  name: string;
}

function FormInput({ id, label, type, name }: IProps) {
  return (
    <div>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input name={name} id={id} className={classes.formInput} type={type} />
    </div>
  );
}

export default FormInput;
