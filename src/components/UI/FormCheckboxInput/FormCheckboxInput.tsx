import React from 'react';
import classes from './FromCheckboxInput.module.css';
import FormErrorLine from '../../FormErrorLine/FormErrorLine';

interface IProps {
  id: string;
  label: string;
  value?: string;
  name: string;
  type: string;
  errorMessage?: string;
}

function FormCheckboxInput({
  id,
  label,
  value,
  name,
  type,
  errorMessage,
}: IProps) {
  return (
    <div>
      <div className={classes.formCheckboxInputWrap}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} value={value} name={name}></input>
      </div>
      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
    </div>
  );
}

export default FormCheckboxInput;
