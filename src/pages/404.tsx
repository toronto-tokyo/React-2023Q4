import React from 'react';
import classes from '../styles/404.module.css';

function ErrorPage() {
  return (
    <div className={classes.errorPage}>
      <div className={classes.inner}>
        <h1 className={classes.info}>{`Ops..., something went wrong :(`}</h1>
      </div>
    </div>
  );
}

export default ErrorPage;
