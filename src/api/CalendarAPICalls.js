import { getSchedules } from "../modules/CalendarModule";



const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;

/* 캘린더 메인 */
export const AllSchedules = () => {
    
    const requestURL = `${PRE_URL}/calendar/schedule`;


    return async(dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

console.log(result);


        if(result.status === 200) {
            console.log('[CalendarAPICalls] : callScheduleListAPI result,', result);
            dispatch(getSchedules(result));
        }



    }


}

/* 등록하기 */