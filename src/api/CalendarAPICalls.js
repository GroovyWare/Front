import { getSchedules, postSchedule, putSchedule, getSchedule, searchSchedules } from "../modules/CalendarModule";



const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;

/* 캘린더 메인 (OK)*/
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

/* 하나 가져오기 */
export const oneSchedule = ({ id }) => { 

    const requestURL = `${PRE_URL}/calendar/schedule/${id}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[ProductAPICalls] callProductCategoriesListAPI result : ", result);
            dispatch(getSchedule(result));
        }
    }
}


/* 검색하기  페이징, 리스트 (DOING, 일부 ok)*/
export const  searchingSchedule = ({searchSchedule, currentPage = 1}) => {
    const encodedSearchSchedule = encodeURIComponent(searchSchedule);
    const requestURL = `${PRE_URL}/calendar/schedule/list?title=${encodedSearchSchedule}&page=${currentPage}`

    return async(dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

    if(result.status === 200) {
        console.log("[searchingSchedule] calling result :  " , result);
        dispatch(searchSchedules(result));
    }

}
}


/* 등록하기 (OK) */
export const createSchedule = (form) => {
    const requestURL = `${PRE_URL}/calendar/schedule`

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
            console.log('[CalendarAPICalls] : callcreateAPI result : ', result);
            dispatch(postSchedule(result));
            dispatch(AllSchedules());
        }
    }
}


/* 수정하기 */
export const updateSchedule = (form) => {
    const requestURL = `${PRE_URL}/calendar/schedule/${form.id}`;

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
            console.log('[ProductAPICalls] callProductUpdateAPI result:', result);
            dispatch(putSchedule(result));
        }
    }
}






/* 삭제하기 */

