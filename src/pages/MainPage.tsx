import FormDataCard from '../components/FormDataCard/FormDataCard';
import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import NavLink from '../components/UI/NavLink/NavLink';
import { useAppSelector } from '../hooks/redux';
import classes from '../styles/MainPage.module.css';

function MainPage() {
  const { uncontrolledForm, reactHookForm } = useAppSelector(
    (store) => store.formsDataSlice
  );

  return (
    <div className={classes.wrapper}>
      <Header>
        <NavBar>
          <NavLink routePath="/react-hook-form">React Hook From</NavLink>
          <NavLink routePath="/uncontrolled-components">
            Uncontrolled Components
          </NavLink>
        </NavBar>
      </Header>
      <main className={classes.main}>
        <div className={classes.cardsWrapper}>
          <div className={classes.cardsRow}>
            <FormDataCard
              cardTitle="React Hook Form Data"
              formData={reactHookForm}
            />
            <FormDataCard
              cardTitle="Uncontrolled Form Data"
              formData={uncontrolledForm}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
