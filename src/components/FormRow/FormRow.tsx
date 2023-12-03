import React from 'react';
import classes from './FormRow.module.css';

interface IProps {
  children: React.ReactNode;
  title: string;
}

function FormRow({ children, title }: IProps) {
  return (
    <div>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.formRow}>{children}</div>
    </div>
  );
}

export default FormRow;
