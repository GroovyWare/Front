import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_LOGIN = 'POST_LOGIN';
const RESET_EMP = 'RESET_EMP';

export const { postLogin, resetEmp } = createActions({
    [POST_LOGIN] : res => res,
    [RESET_EMP] : () => {}
});

const loginReducer = handleActions({
    [POST_LOGIN] : ( state, { payload }) => ({ login : payload }),
    [RESET_EMP] : ( state, action ) => initialState
}, initialState);

export default loginReducer;

