import { createActions, handleActions } from "redux-actions";


const initialState = {};
/* 액션 */
const VIEW_MAIN = 'attendance/VIEW_MAIN'
const POST_ONEATTENDANCE = 'attendance/POST_ONE_ATTENDANCE'
const PUT_ONEATTENDANCE = 'attendance/PUT_ONE_ATTENDANCE'
const INIT_ONEATTENDANCE = 'attendance/INIT_ONEATTENDANCE'
const GET_ATTENDANCES = 'attendance/GET_ATTENDANCES'
const GET_ATTENDANCE = 'attendance/GET_ATTENDANCE'

export const { attendance : { viewMain, postOneAttendance, putOneAttendance, getAttendances, getAttendance}}
= createActions({
    [VIEW_MAIN] : res => res,
    [POST_ONEATTENDANCE] : res => res,
    [PUT_ONEATTENDANCE] : res => res,
    [INIT_ONEATTENDANCE] : () => {},
    [GET_ATTENDANCES] : res => res.data,
    [GET_ATTENDANCE] : res => res.data

})

/* 리듀서 */

const attendanceReducer = handleActions( 

    {
        [VIEW_MAIN]: (state, { payload }) => ({ ...state, attendance: payload}),
        [POST_ONEATTENDANCE]: (state, { payload }) => ({ regist : payload}),
        [PUT_ONEATTENDANCE]: (state, { payload }) => ({ update : payload}),
        [INIT_ONEATTENDANCE]: () => initialState,
        [GET_ATTENDANCES] : (state, { payload }) => payload,
        [GET_ATTENDANCE] : (state, { payload }) => payload,
    },
    initialState
)

export default attendanceReducer;