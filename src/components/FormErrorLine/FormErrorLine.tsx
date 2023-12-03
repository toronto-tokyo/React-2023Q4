import React from 'react';
import classes from './FormErrorLine.module.css';

interface IProps {
  children: React.ReactNode;
}

function FormErrorLine({ children }: IProps) {
  return <div className={classes.errorLine}>{children}</div>;
}

export default FormErrorLine;
