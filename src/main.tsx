import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './reset.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux/es/exports';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
