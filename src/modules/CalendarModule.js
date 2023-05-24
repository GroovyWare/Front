import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    // events : []
};

/* 액션 */
const GET_SCHEDUELS = 'schedule/GET_SCHEDULES'
const GET_SCHEDULE = 'schedule/GET_SCHEDULE'
const POST_SCHEDULE = 'schedule/POST_SCHEDULE'
const PUT_SCHEDULE = 'schedule/PUT_SCHEDULE'
const DELETE_SCHEDULE = 'schedule/DELETE_SCHEDULE'
const INIT_SCHEDULE = 'schedule/INIT_SCHEDULE'
const SEARCH_SCHEDULE = 'schedule/SEARCH_SCHEDULES'


export const { schedule : { getSchedules, getSchedule, postSchedule, putSchedule, deleteschedule, initSchedule, searchSchedules}}
= createActions({
    [GET_SCHEDUELS] : res => res,
    [GET_SCHEDULE] : res => res,
    [PUT_SCHEDULE] : res => res,
    [POST_SCHEDULE] : res => res,
    [INIT_SCHEDULE] : () => {}   ,     // 초기화를 시켜주는 액션을 추가하고 
    [SEARCH_SCHEDULE] : res => res.data
})

/* 리듀서 */

const scheduleReducer = handleActions(
    {
      [GET_SCHEDUELS]: (state, { payload }) => ({ ...state, events: payload, dragEvent: false }),
      [GET_SCHEDULE]: (state, { payload }) => payload,
      [POST_SCHEDULE]: (state, { payload }) => ({ regist: payload }),
      [PUT_SCHEDULE]: (state, { payload }) => ({ modify: payload }),
      [INIT_SCHEDULE] : () => initialState ,     // 초기화를 시켜주는 리듀서를 추가한다.
      [SEARCH_SCHEDULE] : (state, { payload }) => ({ ...state, searchvalues: payload }), // 1번 get_Schedules쪽에서 filter 함수가 충돌하기 때문에 새로 선언해서 사용한다.
    },
    initialState
  );
  
  export default scheduleReducer;
  