import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';
import classes from '../styles/UncontrolledComponents.module.css';

function UncontrolledComponents() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
  };

  return (
    <main className={classes.main}>
      <UncontrolledForm handleSubmit={handleSubmit} />
    </main>
  );
}

export default UncontrolledComponents;
