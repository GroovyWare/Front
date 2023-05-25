import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
const POST_EMPLOYEE = 'employee/POST_EMPLOYEE';

export const { employee : { getEmployees, getEmployee, postEmployee  }} = createActions({
    [GET_EMPLOYEES] : res => res.data,
    [GET_EMPLOYEE] : res => res.data,
    [POST_EMPLOYEE] : res => res
});

const employeeReducer = handleActions(
    {
        [GET_EMPLOYEES] : (state, { payload }) => payload,
        [GET_EMPLOYEE] : (state, { payload }) => payload,
        [POST_EMPLOYEE] : (state, { payload }) => ({ regist : payload })
    }

,initialState);

export default employeeReducer;