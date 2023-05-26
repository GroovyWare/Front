import { getOneAttendance, postOneAttendance, putOneAttendance } from "../modules/AttendanceModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;


/* 근태 사용자 메인  */
export const AttendanceMain = () => {

    const requestURL = `${PRE_URL}/attendance/main`;



    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceAPICalls] : callAttendanceAPI result,', result);
            dispatch(getOneAttendance(result));
        }

    }
}

/* 출근 */
export const goWork = (form) => {

    const requestURL = `${PRE_URL}/attendance/main/go`

    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify(form)
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceAPICalls] : callgoWorkAPI result : ', result);
            dispatch(postOneAttendance(result));
            dispatch(getOneAttendance());
        }
    }

}


/* 퇴근 */
export const leaveWork = (form) => {
    const requestURL = `${PRE_URL}/attendance/main/leave`


    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form), // JSON.stringify를 사용하여 객체를 JSON 문자열로 변환
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceAPICalls] callleaveWork result:', result);
            dispatch(putOneAttendance(result));
        }
    }


}