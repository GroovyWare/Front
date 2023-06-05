import { getEquipment, getEquipments, postEquipment, putEquipment } from "../modules/EquipmentModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callEquipmentListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/equipment?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
        }).then(response => response.json());        

        if(result.status === 200) {
            console.log('[EquipmentAPICalls] : callEquipmentListAPI result : ', result);
            dispatch(getEquipments(result));
        }
    }
}

export const callEquipmentSearchListAPI = ({ search, currentPage = 1}) => {
    const requestURL = `${PRE_URL}/equipment/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
        }).then(response => response.json());

        if(result.status === 200) {
            console.log("[EquipmentAPICalls] callEquipmentSearchAPI result : ", result);
            dispatch(getEquipments(result));
        }
    }
}

export const callEquipmentRegistAPI = (data) => {
    const requestURL = `${PRE_URL}/equipment`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken'),
                "Content-Type": "application/json"
            },
            body : JSON.stringify(data)
        }).then(response => response.json());
        console.log("[EquipmentAPICalls] callEquipmentRegistAPI result : ", result);
        dispatch(postEquipment(result));  // Always dispatch an action, regardless of the status
    }
}

export const callEquipmentUpdateAPI = (eqpCode, formData) => {
    const requestURL = `${PRE_URL}/equipment/${eqpCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken'),
                "Content-Type": "application/json"
            },
            body : JSON.stringify(formData)
        }).then(response => response.json());

        dispatch(putEquipment(result));  // Always dispatch an action, regardless of the status
    }
}

