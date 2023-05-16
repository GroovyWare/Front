import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const REGIST_VACATION = 'approval/REGIST_VACATION';
const REGIST_RESIGN = 'approval/REGIST_RESIGN';
const REGIST_REASON = 'approval/REGIST_REASON';
const SELECT_EMPLOYEE = 'approval/SELECT_EMPLOYEE';

export const { approval : { registVacation, registResign, registReason, 
                            selectEmployee} } = createActions({
    [REGIST_VACATION] : res => res,
    [REGIST_RESIGN] : res => res,
    [REGIST_REASON] : res => res,
    [SELECT_EMPLOYEE] : res => res
});

/* 리듀서 */
const approvalReducer = handleActions({
    [REGIST_VACATION] : (state, { payload }) => ({regist : payload}),
    [REGIST_RESIGN] : (state, {payload}) => ({ registResignation : payload}),
    [REGIST_REASON] : (state, {payload}) => ({ registReason : payload}),
    [SELECT_EMPLOYEE] : (state, {payload}) => ({ employeeList : payload })
}, initialState) 

export default approvalReducer;
