import { searchDocument } from "../modules/DocumentModule";

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