import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<MainPage />}></Route>
        <Route path={'*'} element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
