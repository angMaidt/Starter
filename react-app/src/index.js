import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import SystemProvider from './context/SystemContext';
import './fonts/SpaceGrotesk-2.0.0/ttf/SpaceGrotesk[wght].ttf'

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <SystemProvider>
          <App />
        </SystemProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
