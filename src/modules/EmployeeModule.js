import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE_IDS = 'employee/GET_EMPLOYEE_IDS';
const POST_EMPLOYEE = 'employee/POST_EMPLOYEE';
const PUT_EMPLOYEE = 'employee/PUT_EMPLOYEE';

export const { employee : { getEmployees, getEmployeeIds, postEmployee, putEmployee  }} = createActions({
    [GET_EMPLOYEES] : res => res.data,
    [GET_EMPLOYEE_IDS] : res => res.data,
    [POST_EMPLOYEE] : res => res,
    [PUT_EMPLOYEE] : res => res
});

const employeeReducer = handleActions(
    {
        [GET_EMPLOYEES] : (state, { payload }) => payload,
        [GET_EMPLOYEE_IDS] : (state, { payload }) => ({ check : payload }),
        [POST_EMPLOYEE] : (state, { payload }) => ({ regist : payload }),
        [PUT_EMPLOYEE] : (state, { payload }) => ({ ...state, update : payload })
    }
    ,initialState);

export default employeeReducer;