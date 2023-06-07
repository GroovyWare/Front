import { getEmployeeId, getEmployeeIds, getEmployees, postEmployee, putEmployee } from "../modules/EmployeeModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${ RESTAPI_SERVER_IP }:${ RESTAPI_SERVER_PORT }`;

/* 직원 목록 조회 */
export const callEmployeeListAPI = ({ currentPage=1}) => {
    
    const requestURL =`${PRE_URL}/auth/emp?page=${ currentPage }`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(res => res.json());

        if(result.status === 200) {
            dispatch(getEmployees(result));
        }
    }
}

/* 아이디 중복 검사 */
export const callEmployeeIdCheckAPI = (empId) => {

    const requestURL = `${PRE_URL}/auth/idCheck/${empId}`;
  
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        }).then(res => res.json());

        dispatch(getEmployeeId(result));
    }
}

/* 직원 등록 */
export const callEmployeeRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/auth/emp`;
  
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(postEmployee(result));
        }
    }
}


/* 직원 정보 수정 */
export const callEmplopyeeUpdateAPI = (formData) => {
    
    const requestURL = `${PRE_URL}/auth/emp`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(putEmployee(result));
        }
    }

}


/* 직원명 검색 */
export const callEmployeeSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/auth/emps/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            dispatch(getEmployees(result));
        }
    }
}
