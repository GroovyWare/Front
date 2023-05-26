import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_PASS = 'pass/GET_PASS';
const GET_PAS = 'pass/GET_PAS';
const POST_PASS = 'pass/POST_PASS';
const PUT_PASS = 'pass/PUT_PASS';


export const { pass : { getPass, postPass, putPass, getPas } } = createActions ({
    [GET_PASS] : res => res.data,
    [GET_PAS] : res => res.data,
    [POST_PASS] : res => res,
    [PUT_PASS] : res => res
});

/* 리듀서 */
const passReducer = handleActions (
    {
        [GET_PASS] : (state, { payload }) => payload,
        [GET_PAS] : (state, { payload }) => payload,
        [POST_PASS] : (state, { payload }) => ({ regist : payload }),
        [PUT_PASS] : (state, { payload }) => ({ modify : payload }),
    }
, initialState);

export default passReducer;