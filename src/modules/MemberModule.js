import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_MEMBERS = 'member/GET_MEMBERS';

export const { member : { getMembers } } = createActions ({
    [GET_MEMBERS] : res => res.data
});

/* 리듀서 */
const memberReducer = handleActions (
    {
        [GET_MEMBERS] : (state, { payload }) => payload
    }
, initialState);

export default memberReducer;