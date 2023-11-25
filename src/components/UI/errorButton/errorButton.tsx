import React, { useEffect, useState } from 'react';
import classes from './errorButton.module.css';

function ErrorButton() {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) throw new Error('Error');
  }, [isError]);

  const handleClick = () => {
    setIsError(!isError);
  };

  return (
    <button className={classes.errorButton} onClick={handleClick}>
      Throw error!
    </button>
  );
}

export default ErrorButton;
