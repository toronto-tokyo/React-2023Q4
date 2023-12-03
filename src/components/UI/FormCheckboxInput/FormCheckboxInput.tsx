import React from 'react';
import classes from './FromCheckboxInput.module.css';

interface IProps {
  id: string;
  label: string;
  value?: string;
  name: string;
  type: string;
}

function FormCheckboxInput({ id, label, value, name, type }: IProps) {
  return (
    <div className={classes.formCheckboxInputWrap}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} name={name}></input>
    </div>
  );
}

export default FormCheckboxInput;
