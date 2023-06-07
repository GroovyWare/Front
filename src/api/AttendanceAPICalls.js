import { viewMain, postOneAttendance, putOneAttendance, getAttendances, getAttendance } from "../modules/AttendanceModule";

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
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if (result.status === 200) {
  
            dispatch(viewMain(result));
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

            dispatch(postOneAttendance(result));
            dispatch(viewMain());
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
   
            dispatch(putOneAttendance(result));
            dispatch(viewMain());
        }
    }


}

/* 직원 전체 근태 조회 */
export const callAttendanceListAPI = ({currentPage = 1}) => {

    const requestURL = `${PRE_URL}/attendance/list?page=${currentPage}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());
        
        if(result.status === 200) {
         
            dispatch(getAttendances(result));
        }
    }
}

/* 직원 개인 근태 조회 */
export const callAttendanceDetailAPI = ({ empCode }) => {

    const requestURL = `${PRE_URL}/attendance/detail/${empCode}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
       
            dispatch(getAttendance(result));
        }
    }
}

