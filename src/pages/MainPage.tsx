import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import NavLink from '../components/UI/NavLink/NavLink';

function MainPage() {
  return (
    <div>
      <Header>
        <NavBar>
          <NavLink routePath="/react-hook-form">React Hook From</NavLink>
          <NavLink routePath="/uncontrolled-components">
            Uncontrolled Components
          </NavLink>
        </NavBar>
      </Header>
    </div>
  );
}

export default MainPage;
