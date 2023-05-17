import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_PASS = 'pass/GET_PASS';
const POST_PASS = 'pass/POST_PASS';


export const { pass : { getPass, postPass } } = createActions ({
    [GET_PASS] : res => res,
    [POST_PASS] : res => res
});

/* 리듀서 */
const passReducer = handleActions (
    {
        [GET_PASS] : (state, { payload }) => payload,
        [POST_PASS] : (state, { payload }) => ({ regist : payload })
    }
, initialState);

export default passReducer;