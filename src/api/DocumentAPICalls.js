import { searchDocument, addDocument, searchDoctitle } from "../modules/DocumentModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;

/* 문서 조회 */
export const searchDocumentList = (docTitle) => {

    const requestURL = `${PRE_URL}/document/set?docTitle=${docTitle}`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());

        console.log(result);

        dispatch(searchDocument(result));
    }
}

/* 양식 저장 */
export const addDocumentAPI = (data) => {

    const requestURL = `${PRE_URL}/document/add`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method : "POST",
            headers : {
                'Content-Type' : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(data)
        }).then(response => response.json());

        dispatch(addDocument(result));
    }

}

/* 양식명 찾기 */
export const searchDocTitleAPI = () => {

    const requestURL = `${PRE_URL}/document/search`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        dispatch(searchDoctitle(result));
    }
}