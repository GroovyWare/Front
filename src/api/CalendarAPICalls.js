import { getSchedules } from "../modules/CalendarModule";



const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://localhost:8059/calendar/schedule/`;

/* 캘린더 메인 */
export const AllSchedules = (data) => {
    
    const requestURL = `${PRE_URL}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log('[CalendarAPICalls] : callCalendarAPI result : ', result);
            dispatch(getSchedules(result));
        }
    }


}

/* 등록하기 */