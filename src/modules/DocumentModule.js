import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initialState = {}

/* 액션 */
const SEARCH_DOCUMENT = 'document/SEARCH_DOCUMENT';

export const {document : {searchDocument}} = createActions({
    [SEARCH_DOCUMENT] : res => res
});

/* 리듀서 */
const documentReducer = handleActions({
    [SEARCH_DOCUMENT] : (state, {payload}) => ({ setDocument : payload })
}, initialState)

export default documentReducer;