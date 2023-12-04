import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import UncontrolledComponents from './pages/UncontrolledComponents';

function App() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/react-hook-form" element={<ReactHookFormPage />} />
      <Route
        path="/uncontrolled-components"
        element={<UncontrolledComponents />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
