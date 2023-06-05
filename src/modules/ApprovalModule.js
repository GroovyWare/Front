import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const REGIST_APPROVAL = 'approval/REGIST_APPROVAL';
const SELECT_EMPLOYEE = 'approval/SELECT_EMPLOYEE';
const SEARCH_EMPLOYEE = 'approval/SEARCH_EMPLOYEE';
const SEARCH_DEPARTMENT = 'approval/SEARCH_DEPARTMENT';
const SELECT_PERSON = 'approval/SELECT_PERSON';
const SEARCH_REQUEST = 'approval/SEARCH_REQUEST';
const SEARCH_CONTEXT = 'approval/SEARCH_CONTEXT';
const ADD_COUNT = 'approval/ADD_COUNT';
const SEARCH_WAIT = 'approval/SEARCH_WAIT';
const SEARCH_NOW = 'approval/SEARCH_NOW';
const SEARCH_APPROVELINE = 'approval/SEARCH_APPROVELINE';
const ACCEPT_APPROVAL = 'approval/ACCEPT_APPROVAL';
const SEARCH_LIST = 'approval/SEARCH_LIST';

export const { approval : { registApproval,selectEmployee, searchEmployee, searchDepartment, selectPerson
                            , searchRequest, searchContext, addCount, searchWait
                            , searchNow, searchApproveline, acceptApproval, searchList } } = createActions({
    [REGIST_APPROVAL] : res => res,
    [SELECT_EMPLOYEE] : res => res,
    [SEARCH_EMPLOYEE] : res => res,
    [SEARCH_DEPARTMENT] : res => res,
    [SELECT_PERSON] : res => res,
    [SEARCH_REQUEST] : res => res.data,
    [SEARCH_CONTEXT] : res => res.data,
    [ADD_COUNT] : res => res,
    [SEARCH_WAIT] : res => res,
    [SEARCH_NOW] : res => res,
    [SEARCH_APPROVELINE] : res => res,
    [ACCEPT_APPROVAL] : res => res,
    [SEARCH_LIST] : res => res
});

/* 리듀서 */
const approvalReducer = handleActions({
    [REGIST_APPROVAL] : (state, { payload }) => ({regist : payload}),
    [SELECT_EMPLOYEE] : (state, {payload}) => ({  ...state, employeeList : payload }),
    [SEARCH_EMPLOYEE] : (state, {payload}) => ({  ...state, searchList : payload }),
    [SEARCH_DEPARTMENT] : (state, {payload}) => ({department : payload }),
    [SELECT_PERSON] : (state, {payload}) => ({employee : payload}),
    [SEARCH_REQUEST] : (state, {payload}) => ({requestList : payload}),
    [SEARCH_CONTEXT] : (state, {payload}) => ({...state, context : payload}),
    [ADD_COUNT] : (state, {payload}) => ({count : payload}),
    [SEARCH_WAIT] : (state, {payload}) => ({...state, waitList : payload}),
    [SEARCH_NOW] : (state, {payload}) => ({...state, now : payload}),
    [SEARCH_APPROVELINE] : (state, {payload}) => ({ ...state, line : payload}),
    [ACCEPT_APPROVAL] : (state, {payload}) => ({...state, accept : payload}),
    [SEARCH_LIST] : (state, {payload}) => ({...state, list : payload}) 
}, initialState) 

export default approvalReducer;
