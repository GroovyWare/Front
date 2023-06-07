import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { GlobalStyle } from './App';
import store from './Store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EmployeeProvider } from './Approval/pages/employee/EmployeeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
<EmployeeProvider>
    <DndProvider backend={HTML5Backend}>
        <ToastContainer position="top-center" autoClose={1000} />
        <GlobalStyle/>
            <App/>
    </DndProvider>
</EmployeeProvider>
</Provider>
);
