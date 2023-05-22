import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { GlobalStyle } from './App';
import store from './Store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <ToastContainer/>
    <GlobalStyle/>
        <App/>
</Provider>
);
