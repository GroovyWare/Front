import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_ANNOUNCES = 'announce/GET_ANNOUNCES';
const GET_ANNOUNCE = 'announce/GET_ANNOUNCE'
const POST_ANNOUNCE = 'announce/POST_ANNOUNCE';
const PUT_ANNOUNCE = 'announce/PUT_ANNOUNCE';
const DELETE_ANNOUNCE = 'announce/DELETE_ANNOUNCE';

export const { announce : { getAnnounces, getAnnounce, postAnnounce, putAnnounce, deleteAnnounce } } = createActions({
    [GET_ANNOUNCES] : res => res.data,
    [GET_ANNOUNCE] : res => res.data,
    [POST_ANNOUNCE] : res => res,
    [PUT_ANNOUNCE] : res => res,
    [DELETE_ANNOUNCE] : res => res
}); 

/* 리듀서 */
const announceReducer = handleActions(
    {
        [GET_ANNOUNCES] : (state, { payload }) => payload,
        [GET_ANNOUNCE] : (state, { payload }) => payload,
        [POST_ANNOUNCE] : (state, { payload }) => ({ regist : payload }),
        [PUT_ANNOUNCE] : (state, { payload }) => ({ regist : payload }),
        [DELETE_ANNOUNCE] : (state, { payload }) => ({ regist : payload })
    }
, initialState);

export default announceReducer;