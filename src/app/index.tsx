import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ApiContextProvider } from './ApiContext';

ReactDOM.render(
  <React.StrictMode>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
