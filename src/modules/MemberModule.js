import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_MEMBERS = 'member/GET_MEMBERS';
const GET_MEMBER = 'member/GET_MEMBER';
const POST_MEMBER = 'member/POST_MEMBER';
const PUT_MEMBER = 'member/PUT_MEMBER';



export const { member : { getMembers, getMember, postMember, putMember } } = createActions ({
    [GET_MEMBERS] : res => res.data,
    [GET_MEMBER] : res => res.data,
    [POST_MEMBER] : res => res,
    [PUT_MEMBER] : res => res
});

/* 리듀서 */
const memberReducer = handleActions (
    {
        [GET_MEMBERS] : (state, { payload }) => payload,
        [GET_MEMBER] : (state, { payload }) => payload,
        [POST_MEMBER] : (state, { payload }) => ({ regist : payload }),
        [PUT_MEMBER] : (state, { payload }) => ({ modify : payload })
    }
, initialState);

export default memberReducer;