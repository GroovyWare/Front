import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_HISTORY = 'history/GET_HISTORY';
const POST_HISTORY = 'history/POST_HISTORY';



export const { history : { getHistory, postHistory } } = createActions ({
    [GET_HISTORY] : res => res.data,
    [POST_HISTORY] : res => res
});

/* 리듀서 */
const historyReducer = handleActions (
    {
        [GET_HISTORY] : (state, { payload }) => ({ history: payload }),
        [POST_HISTORY] : (state, { payload }) => ({ regist: payload }),
    }
, initialState);

export default historyReducer;