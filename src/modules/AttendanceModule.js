import { createActions, handleActions } from "redux-actions";


const initialState = {

};

/* 액션 */
const GET_ONEATTENDANCE = 'attendance/GET_ONEATTENDANCE'
const POST_ONEATTENDANCE = 'attendance/POST_ONEATTENDANCE'
const PUT_ONEATTENDANCE = 'attendance/PUT_ONEATTENDANCE'
const INIT_ONEATTENDANCE = 'attendance/INIT_ONEATTENDANCE'

export const { attendance : { getOneAttendance, postOneAttendance, putOneAttendance}}
= createActions({
    [GET_ONEATTENDANCE] : res => res,
    [POST_ONEATTENDANCE] : res => res,
    [PUT_ONEATTENDANCE] : res => res,
    [INIT_ONEATTENDANCE] : () => {}

})

/* 리듀서 */

const attendanceReducer = handleActions( 

    {
        [GET_ONEATTENDANCE]: (state, { payload }) => payload,
        [POST_ONEATTENDANCE]: (state, { payload }) => ({ regist : payload}),
        [PUT_ONEATTENDANCE]: (state, { payload }) => ({ update : payload}),
        [INIT_ONEATTENDANCE]: () => initialState,



    },
    initialState


)

export default attendanceReducer;