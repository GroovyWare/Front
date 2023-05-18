import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_HISTORY = 'history/GET_HISTORY';



export const { history : { getHistory } } = createActions ({
    [GET_HISTORY] : res => res.data
});

/* 리듀서 */
const historyReducer = handleActions (
    {
        [GET_HISTORY] : (state, { payload }) => ({ history: payload })
    }
, initialState);

export default historyReducer;