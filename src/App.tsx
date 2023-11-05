import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<MainPage />}>
          <Route path={':id'} element={<DetailsPage />}></Route>
        </Route>
        <Route path={'*'} element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
