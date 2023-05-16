import { getMembers } from "../modules/MemberModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callMemberListAPI = ( {currentPage = 1} ) => {

    const requestURL = `${PRE_URL}/member/list?page=${currentPage}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());
        

        if(result.status === 200) {
            console.log('[MemberAPICalls] : callMemberListAPI result,', result);
            dispatch(getMembers(result));
        }
    }
}