import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const REGIST_APPROVAL = 'approval/REGIST_APPROVAL';
const SELECT_EMPLOYEE = 'approval/SELECT_EMPLOYEE';
const SEARCH_EMPLOYEE = 'approval/SEARCH_EMPLOYEE';
const SEARCH_DEPARTMENT = 'approval/SEARCH_DEPARTMENT';

export const { approval : { registApproval,selectEmployee, searchEmployee, searchDepartment
                            } } = createActions({
    [REGIST_APPROVAL] : res => res,
    [SELECT_EMPLOYEE] : res => res,
    [SEARCH_EMPLOYEE] : res => res,
    [SEARCH_DEPARTMENT] : res => res
});

/* 리듀서 */
const approvalReducer = handleActions({
    [REGIST_APPROVAL] : (state, { payload }) => ({regist : payload}),
    [SELECT_EMPLOYEE] : (state, {payload}) => ({  ...state, employeeList : payload }),
    [SEARCH_EMPLOYEE] : (state, {payload}) => ({  ...state, searchList : payload }),
    [SEARCH_DEPARTMENT] : (state, {payload}) => ({department : payload })
}, initialState) 

export default approvalReducer;
