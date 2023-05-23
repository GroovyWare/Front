import { registApproval } from "../modules/ApprovalModule";
import { selectEmployee, searchEmployee, searchDepartment, addApproveLine } from "../modules/ApprovalModule";
import { selectPerson } from "../modules/ApprovalModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}`;

/* 결재 등록 */
export const registDoc = (formData, docTitle) => {
    const requestURL = `${PRE_URL}/approval/save?docTitle=${docTitle}`;
  
    return async (dispatch, getState) => {
    
    const result = await fetch(requestURL, {
        method: 'POST',
        headers: {
            "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body: formData
      }).then(response => response.json());
  
      if(result.status === 200){
        dispatch(registApproval(result));
      }
    };
  };

  /* 기안서 작성자 찾기 */
export const selectPersonAPICall = () => {
    const requestURL = `${PRE_URL}/approval/search/employee`;

        return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(selectPerson(result));
        }
    }
}

/* 조직도 조회 */
export const selectEmployeeList = () => {

    const requestURL = `${PRE_URL}/auth/emp`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200){
            dispatch(selectEmployee(result));
        }
    }
}

/* 조직도 검색 */
export const searchEmployeeList = ({empName}) => {
    const requestURL = `${PRE_URL}/approval/search?empName=${empName}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        console.log("result", result);

       if(result.status === 200){
        dispatch(selectEmployee(result));
       }
    }
}

/* 조직도 부서 조회 */
export const searchDepartmentList = () => {

    const requestURL = `${PRE_URL}/approval/search/dept`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200){
            dispatch(searchDepartment(result));
        }
    }
}

/* 결재권자 추가 */
export const addApproveLineAPI = () => {

    const requestURL = `${PRE_URL}/approval/save`

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : {
                
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(addApproveLine(result));
        }
    }
}
