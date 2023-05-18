import { postLogin } from "../modules/LoginModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${ RESTAPI_SERVER_IP }:${ RESTAPI_SERVER_PORT }`;


export const callLoginAPI = (form) => {

    const requestURL = `${PRE_URL}/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
             method : 'POST',
             headers : {
                'Content-Type' : 'application/json'
             },
             body : JSON.stringify(form)
        })
        .then(res => res.json())
        
        console.log('[LoginCallAPI] callLoginAPI result : ', result);

        if(result.status === 200) {
          
            window.localStorage.setItem('accessToken', result.data.accessToken); 
        }   

        dispatch(postLogin(result));
    }
}