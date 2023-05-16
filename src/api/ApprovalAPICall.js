import {registVacation, registResign, registReason } from "../modules/ApprovalModule";
import { selectEmployee } from "../modules/ApprovalModule";

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

