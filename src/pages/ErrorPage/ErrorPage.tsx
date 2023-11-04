import RestartButton from '../../components/UI/RestartButton/RestartButton';
import classes from './ErrorPage.module.css';

function ErrorPage() {
  return (
    <div className={classes.errorPage}>
      <div className={classes.inner}>
        <h1 className={classes.info}>{`Ops..., something went wrong :(`}</h1>
        <RestartButton />
      </div>
    </div>
  );
}

export default ErrorPage;
