import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_LOGIN = 'POST_LOGIN'

export const { postLogin } = createActions({
    [POST_LOGIN] : res => res
});

const loginReducer = handleActions({
    [POST_LOGIN] : ( state, { payload }) => ({ login : payload })
}, initialState);

export default loginReducer;

