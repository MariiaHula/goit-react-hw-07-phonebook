import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';
import './index.css';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

const Global = createGlobalStyle`
* {
       margin:0;
       padding:0;
       box-sizing:border-box;
       }`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer autoClose={1500} />
    <Global />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
