import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE_ID = 'employee/GET_EMPLOYEE_ID';
const POST_EMPLOYEE = 'employee/POST_EMPLOYEE';
const PUT_EMPLOYEE = 'employee/PUT_EMPLOYEE';
const INIT_EMPLOYEE = 'employee/INIT_EMPLOYEE';

export const { employee : { getEmployees, getEmployeeId, postEmployee, putEmployee, initEmployee  }} = createActions({
    [GET_EMPLOYEES] : res => res.data,
    [GET_EMPLOYEE_ID] : res => res,
    [POST_EMPLOYEE] : res => res,
    [PUT_EMPLOYEE] : res => res,
    [INIT_EMPLOYEE] : () => {}
});

const employeeReducer = handleActions(
    {
        [GET_EMPLOYEES] : (state, { payload }) => payload,
        [GET_EMPLOYEE_ID] : (state, { payload }) => ({ check : payload }),
        [POST_EMPLOYEE] : (state, { payload }) => ({ regist : payload }),
        [PUT_EMPLOYEE] : (state, { payload }) => ({ ...state, update : payload }),
        [INIT_EMPLOYEE] : (state, { payload }) => ({ ...state, update : initialState })
    }
    ,initialState);

export default employeeReducer;