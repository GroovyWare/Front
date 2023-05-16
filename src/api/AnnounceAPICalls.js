import { getAnnounce, getAnnounces, postAnnounce, putAnnounce, deleteAnnounce } from "../Announce/modules/AnnounceModule.js";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callAnnounceListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/announce?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
        }).then(response => response.json());        

        if(result.status === 200) {
            console.log('[AnnounceAPICalls] : callAnnounceListAPI result : ', result);
            dispatch(getAnnounces)
        }
    }
}

export const callAnnounceSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/announce/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
        }).then(response => response.json());
        

        if(result.status === 200) {
            console.log("[AnnounceAPICalls] callAnnounceSearchAPI result : ", result);
            dispatch(getAnnounces(result));
        }
    }
}

export const callAnnounceDetailAPI = ({ annCode }) => {

    const requestURL = `${PRE_URL}/announce/${annCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'GET',
        }).then(response => response.json());
        

        if(result.status === 200) {
            console.log("[AnnounceAPICalls] callAnnounceDetailAPI result : ", result);
            dispatch(getAnnounce(result));
        }
    }
}

export const callAnnounceListForAdminAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/announce-management?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[AnnounceAPICalls] callAnnounceListForAdminAPI result : ", result);
            dispatch(getAnnounces(result));
        }
    }
}

export const callAnnounceRegistAPI = (formData) => {

    const requestURL = `${PRE_URL}/announce`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[AnnounceAPICalls] callAnnounceRegistAPI result : ", result);
            dispatch(postAnnounce(result));
        }
    }
}

export const callAnnounceDetailForAdminAPI = ({ annCode }) => {

    const requestURL = `${PRE_URL}/announce-management/${annCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[AnnounceAPICalls] callAnnounceDetailForAdminAPI result : ", result);
            dispatch(getAnnounce(result));
        }
    }
}

export const callAnnounceUpdateAPI = (formData) => {

    const requestURL = `${PRE_URL}/announce`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[AnnounceAPICalls] callAnnounceUpdateAPI result : ", result);
            dispatch(putAnnounce(result));
        }
    }
}

export const callAnnounceDeleteAPI = (formData) => {

    const requestURL = `${PRE_URL}/announce`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'DELETE',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[AnnounceAPICalls] callAnnounceDeleteAPI result : ", result);
            dispatch(deleteAnnounce(result));
        }
    }
}
