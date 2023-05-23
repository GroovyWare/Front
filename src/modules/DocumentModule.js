import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initialState = {}

/* 액션 */
const SEARCH_DOCUMENT = 'document/SEARCH_DOCUMENT';
const SEARCH_DOCTITLE = 'document/SEARCH_DOCTITLE';
const ADD_DOCUMENT = 'document/ADD_DOCUMENT';

export const {document : {searchDocument, addDocument, searchDoctitle}} = createActions({
    [SEARCH_DOCUMENT] : res => res,
    [ADD_DOCUMENT] : res => res,
    [SEARCH_DOCTITLE] : res => res
});

/* 리듀서 */
const documentReducer = handleActions({
    [SEARCH_DOCUMENT] : (state, {payload}) => ({ setDocument : payload }),
    [ADD_DOCUMENT] : (state, {payload}) => ({ add : payload }),
    [SEARCH_DOCTITLE] : (state, {payload}) => ({ ...state, search : payload })
}, initialState)

export default documentReducer;