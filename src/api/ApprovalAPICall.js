import RequestWait from "../Approval/pages/lists/RequestWait";
import { registApproval, searchApproveline } from "../modules/ApprovalModule";
import { selectEmployee, searchEmployee, searchDepartment } from "../modules/ApprovalModule";
import { selectPerson, searchRequest, searchContext, searchWait, searchNow, acceptApproval, searchList } from "../modules/ApprovalModule";

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

/* 결재 요청 목록 조회 */
export const searchRequestAPI = ({currentPage}) => {

    const requestURL = `${PRE_URL}/approval/request?page=${currentPage}`

    return async (dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(searchRequest(result));
        }
    }
}

/* 결재 대기 목록 조회 */
export const searchWaitAPI = ({currentPage}) => {
    const requestURL = `${PRE_URL}/approval/wait?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(searchWait(result));
        }
    }
}

/* 기안서 조회 */
export const searchContextAPI = (apvCode) => {

    const requestURL = `${PRE_URL}/approval/context?apvCode=${apvCode}`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(searchContext(result));
        }
    }
}

/* 현재 로그인 한 사람의 정보 */
export const searchNowAPI = () => {
    const requestURL = `${PRE_URL}/approval/now`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(searchNow(result));
        }
    }
}

/* 결재권자 이름 찾기 */
export const searchApproveLineAPI = (empCodes) => {
    const requestURL = `${PRE_URL}/approval/searchApproveLine`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken'),
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(empCodes)
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(searchApproveline(result));
        }
    }
}

/* 승인 , 반려 반영하기 */
export const acceptApprovalAPI = (form) => {
    const requestURL = `${PRE_URL}/approval/status`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken'),
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(form)
        }).then(response => response.json());

        if(result.status===200){
            dispatch(acceptApproval(result));
        }
    }
}

/* 종결함, 반려함 목록 */
export const searchListAPI = ({currentPage}) => {
    const requestURL = `${PRE_URL}/approval/list`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken'),
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(searchList(result));
        }
    }
}


// /* 상태 변경 */
// export const addCountAPI = (apvCode, count) => {
//     const requestURL = `${PRE_URL}/approval/count?apvCode=${apvCode}`

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL,{
//             method : "POST",
//             headers : {
//                 "Content-Type" : "application/json",
//                 "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
//             },
//             body : JSON.stringify(count)
            
//         }).then(response => response.json());
//     }
// }

