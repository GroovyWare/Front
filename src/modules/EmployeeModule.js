import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';

export const { employee : { getEmployees, getEmployee }} = createActions({
    [GET_EMPLOYEES] : res => res.data,
    [GET_EMPLOYEE] : (res) => res.data
});

const employeeReducer = handleActions(
    {
        [GET_EMPLOYEES] : (state, { payload }) => payload,
        [GET_EMPLOYEE] : (state, { payload }) => payload
    }

,initialState);

export default employeeReducer;