import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const REGIST_VACATION = 'approval/REGIST_VACATION';
const REGIST_RESIGN = 'approval/REGIST_RESIGN';
const REGIST_REASON = 'approval/REGIST_REASON';

export const { approval : { registVacation, registResign, registReason } } = createActions({
    [REGIST_VACATION] : res => res,
    [REGIST_RESIGN] : res => res,
    [REGIST_REASON] : res => res
});

/* 리듀서 */
const approvalReducer = handleActions({
    [REGIST_VACATION] : (state, { payload }) => ({regist : payload}),
    [REGIST_RESIGN] : (state, {payload}) => ({ registResignation : payload}),
    [REGIST_REASON] : (state, {payload}) => ({ registReason : payload})
}, initialState) 

export default approvalReducer;
