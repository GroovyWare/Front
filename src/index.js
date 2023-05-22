import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { GlobalStyle } from './App';
import store from './Store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <DndProvider backend={HTML5Backend}>
        <ToastContainer/>
        <GlobalStyle/>
            <App/>
    </DndProvider>
</Provider>
);
