import { getPass, postPass } from "../modules/PassModule";

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
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());
        
        if(result.status === 200) {
            console.log('[PassAPICalls] : callPassListAPI result,', result);
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
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[PassAPICalls] : callPassRegistAPI result,', result);
            dispatch(postPass(result));
        }
    }

}