import { getPass, postPass, putPass, getPas } from "../modules/PassModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;


/* 회원권 전체 리스트 조회 */
export const callPassListAPI = ( {currentPage = 1} ) => {

    const requestURL = `${PRE_URL}/pass/list?page=${currentPage}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());
        
        if(result.status === 200) {
            dispatch(getPass(result));
        }
    }
}


/* 회원권 등록 */
export const callPassRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/pass/regist`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(postPass(result));
        }
    }

}

/* 회원권 수정을 위한 정보 조회 */
export const callPassDetailReadModifyAPI = ({ passCode }) => {

    const requestURL = `${PRE_URL}/pass/detail/${passCode}`;
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(getPas(result));
        }
    }
}

/* 회원권 수정 */
export const callPassModifyAPI = (formData) => {
    
    const requestURL = `${PRE_URL}/pass/modify`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(putPass(result));
        }
    }

}

