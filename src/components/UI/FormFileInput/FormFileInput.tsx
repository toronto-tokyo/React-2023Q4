import classes from './FormFileInput.module.css';

interface IProps {
  id: string;
  label: string;
  name: string;
  accept: string;
}

function FormFileInput({ id, label, name, accept }: IProps) {
  return (
    <div>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input type="file" name={name} accept={accept} />
    </div>
  );
}

export default FormFileInput;
