import React from 'react';
import classes from './FormRow.module.css';
import FormErrorLine from '../FormErrorLine/FormErrorLine';

interface IProps {
  children: React.ReactNode;
  title: string;
  errorMessage?: string;
}

function FormRow({ children, title, errorMessage }: IProps) {
  return (
    <div>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.formRow}>{children}</div>
      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
    </div>
  );
}

export default FormRow;
