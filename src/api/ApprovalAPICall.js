import { registApproval } from "../modules/ApprovalModule";
import { selectEmployee, searchEmployee, searchDepartment } from "../modules/ApprovalModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;

/* 결재 등록 */
export const registDoc = (data, docTitle) => {
    const requestURL = `${PRE_URL}/approval/save?docTitle=${docTitle}`;
  
    return async (dispatch, getState) => {
    
    const result = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body: JSON.stringify(data)
      }).then(response => response.json());
  
      dispatch(registApproval(result));
    };
  };

/* 조직도 조회 */
export const selectEmployeeList = () => {

    const requestURL = `${PRE_URL}/auth/emp`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        dispatch(selectEmployee(result));
    }
}

/* 조직도 검색 */
export const searchEmployeeList = ({empName}) => {
    const requestURL = `${PRE_URL}/approval/search?empName=${empName}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        console.log("result", result);

        dispatch(searchEmployee(result));
    }
}

/* 조직도 부서 조회 */
export const searchDepartmentList = () => {

    const requestURL = `${PRE_URL}/approval/search/dept`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(response => response.json());

        dispatch(searchDepartment(result));
    }
}
