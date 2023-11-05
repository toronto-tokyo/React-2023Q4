import classes from './RestartButton.module.css';

function RestartButton() {
  const restartPage = () => location.reload();

  return (
    <button className={classes.restartBtn} onClick={restartPage}>
      Restart
    </button>
  );
}

export default RestartButton;
