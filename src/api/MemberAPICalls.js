import { getMember, getMembers, postMember, putMember, postPass } from "../modules/MemberModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

/* 회원 전체 리스트 조회 */
export const callMemberListAPI = ( {currentPage = 1} ) => {

    const requestURL = `${PRE_URL}/member/list?page=${currentPage}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());
        

        if(result.status === 200) {
            dispatch(getMembers(result));
        }
    }
}

/* 회원 상세 조회 */
export const callMemberDetailAPI = ({ memCode }) => {

    const requestURL = `${PRE_URL}/member/detail/${memCode}`;

    return async(dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(getMember(result));
        }
    }
}

/* 회원 등록 */
export const callMemberRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/member/regist`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                Authorization : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(postMember(result));
        }
    }
}

/* 회원 수정을 위한 정보 조회 */
export const callMemberDetailReadModifyAPI = ({ memCode }) => {

    const requestURL = `${PRE_URL}/member/detail/${memCode}`;
    
    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(getMember(result));
        }
    }
}

/* 회원 수정 */
export const callMemberModifyAPI = (formData) => {
    
    const requestURL = `${PRE_URL}/member/modify`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            dispatch(putMember(result));
        }
    }

}


/* 회원명 검색 목록 조회 */
export const callMemberSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/member/members/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            dispatch(getMembers(result));
        }
    }
}



