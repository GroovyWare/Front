import { getEmployee, getEmployees } from "../modules/EmployeeModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${ RESTAPI_SERVER_IP }:${ RESTAPI_SERVER_PORT }`;

/* 직원 목록 조회 */
export const callEmployeeListAPI = ({ currentPage=1}) => {
    
    const requestURL =`${PRE_URL}/auth/emp?page=${ currentPage }`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(res => res.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] : callEmployeeListAPI result : ', result);
            dispatch(getEmployees(result));
        }
    }
}

/* 직원 상세 조회 */
export const callEmployeeDetailsAPI = ({ empCode }) => {
    
    const requestURL =`${PRE_URL}/auth/emp/${ empCode }`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(res => res.json());
        
        if(result.status === 200) {
            console.log('[EmployeeAPICalls] : callEmployeeDetailsAPI result : ', result);
            dispatch(getEmployee(result));
        }
    }
}

/* 직원 들록 */