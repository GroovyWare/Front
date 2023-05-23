import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_LOGIN = 'POST_LOGIN';
const RESET_EMP = 'RESET_EMP';
const GET_USER = 'GET_USER';

export const { postLogin, resetEmp, getUser } = createActions({
    [POST_LOGIN] : res => res,
    [RESET_EMP] : () => {},
    [GET_USER] : res => res
});

const loginReducer = handleActions({
    [POST_LOGIN] : ( state, { payload }) => ({ login : payload }),
    [RESET_EMP] : ( state, action ) => initialState,
    [GET_USER] : ( state, { payload }) => ({ user : payload }),
}, initialState);

export default loginReducer;

