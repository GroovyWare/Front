import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    events : []
};

/* 액션 */
const GET_SCHEDUELS = 'schedule/GET_SCHEDULES'
const GET_SCHEDULE = 'schedule/GET_SCHEDULE'
const POST_SCHEDULE = 'schedule/POST_SCHEDULE'
const PUT_SCHEDULE = 'schedule/PUT_SCHEDULE'
const DELETE_SCHEDULE = 'schedule/DELETE_SCHEDULE'


export const { schedule : { getSchedules, getSchedule, postSchedule, putSchedule, deleteschedule}}
= createActions({
    [GET_SCHEDUELS] : res => res,
    [GET_SCHEDULE] : res => res.data,
    [PUT_SCHEDULE] : res => res,
    [POST_SCHEDULE] : res => res
})

/* 리듀서 */

const scheduleReducer = handleActions(
    {
      [GET_SCHEDUELS]: (state, { payload }) => ({ ...state, events: payload }),
      [GET_SCHEDULE]: (state, { payload }) => payload,
      [POST_SCHEDULE]: (state, { payload }) => ({ regist: payload }),
      [PUT_SCHEDULE]: (state, { payload }) => ({ modify: payload }),
    },
    initialState
  );
  
  export default scheduleReducer;
  