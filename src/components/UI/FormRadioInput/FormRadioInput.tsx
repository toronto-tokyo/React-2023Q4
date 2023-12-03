import classes from './FormRadioInput.module.css';

interface IProps {
  id: string;
  label: string;
  value: string;
  name: string;
  type: string;
}

function FormRadioInputs({ id, label, value, name, type }: IProps) {
  return (
    <div className={classes.formRadioInputWrap}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} name={name}></input>
    </div>
  );
}

export default FormRadioInputs;
