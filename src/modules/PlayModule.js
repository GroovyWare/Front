import { initializeConnect } from "react-redux/es/components/connect";
import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initalState = {};

/* 액션 */
const SELECT_LIST = 'play/selectList';

export const { play : {selectList}} = createActions({
    [SELECT_LIST] : res => res
})

/* 리듀서 */
const playReducer = handleActions({
    [SELECT_LIST] : (state, {payload}) => ({memberList : payload})
}, initalState)

export default playReducer;
