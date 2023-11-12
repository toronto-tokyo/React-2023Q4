import classes from './Loader.module.css';

function Loader() {
  return (
    <div className={classes.loader} data-testid="loader">
      <div className={classes.loader__icon}></div>
    </div>
  );
}

export default Loader;
