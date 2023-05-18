import { getHistory } from "../modules/HistoryModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

/* 회원 이력 유무확인(모달) */
export const callMemberHistoryCheckAPI = ({ memCode }) => {

    const requestURL = `${PRE_URL}/member/log/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }).then((response) => response.json());
    
        if (result.status === 200) {
          console.log("[MemberHistoryAPICalls] callMemberHistoryCheckAPI result : ", result);
          dispatch(getHistory(result));
        }
      };

};