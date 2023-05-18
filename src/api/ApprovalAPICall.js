import {registVacation, registResign, registReason } from "../modules/ApprovalModule";
import { selectEmployee, searchEmployee, searchDepartment, searchDocument } from "../modules/ApprovalModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;

/* 휴가 신청서 등록 */
export const registVacationDoc = (data) => {

    const requestURL = `${PRE_URL}/document/save`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then(response => response.json());

        dispatch(registVacation(result));
    }
}

/* 사직서 등록 */
export const registResignDoc = (data) => {

    const requestURL = `${PRE_URL}/document/save`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then(response => response.json());

        dispatch(registResign(result));
    }
}

/* 사유서 등록 */
export const registReasonDoc = (data) => {

    const requestURL = `${PRE_URL}/document/save`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }).then(response => response.json());

        dispatch(registReason(result));
    }
}

/* 조직도 조회 */
export const selectEmployeeList = () => {

    const requestURL = `${PRE_URL}/auth/emp`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        dispatch(selectEmployee(result));
    }
}

/* 조직도 검색 */
export const searchEmployeeList = ({empName}) => {
    const requestURL = `${PRE_URL}/approval/search?empName=${empName}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        console.log("result", result);

        dispatch(searchEmployee(result));
    }
}

/* 조직도 부서 조회 */
export const searchDepartmentList = () => {

    const requestURL = `${PRE_URL}/approval/search/dept`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(response => response.json());

        dispatch(searchDepartment(result));
    }
}

/* 문서 조회 */
export const searchDocumentList = () => {

    const requestURL = `${PRE_URL}/document/set`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());

        console.log(result)

        dispatch(searchDocument(result));
    }
}
