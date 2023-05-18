import { selectList } from "../modules/PlayModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;

/* 회원 목록 조회 */
export const selectPlayMember = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/play/memberList?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            } 
        }).then(response => response.json());

        console.log('result', result)

        if(result.status === 200){
            dispatch(selectList(result));
        }
    }
}