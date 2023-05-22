import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceDetailAPI } from "../../../api/AnnounceAPICalls";

function AnnounceDetail() {

    // const userRole = useSelector(state => state.authCode); // 이 부분은 실제 authCode를 가져오는 Redux Selector로 변경해야 합니다.
    const [userRole, setUserRole] = useState('1'); // 임의의 userRole 상태 생성
    const dispatch = useDispatch();
    const params = useParams();
    const announce = useSelector(state => state.announceReducer);
    const annCode = params.annCode;

    useEffect(() => {
        dispatch(callAnnounceDetailAPI({ annCode }));
    }, [annCode, dispatch]);

    return (
        <div>
            {userRole === '1' && (
                <>
                <button>수정</button>
                <button>삭제</button>
                </>
            )}
            <h2>{announce.annTitle}</h2>
            <p>{`${announce?.employee?.empName}`}</p>
            <p>{`${new Date(announce.annDate).toLocaleString()}`}</p>
            <p>{announce.annContent}</p>
            <button>목록</button>
        </div>
    );
}

export default AnnounceDetail;
