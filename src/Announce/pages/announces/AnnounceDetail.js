import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callAnnounceDetailAPI } from "../../../api/AnnounceAPICalls";

function AnnounceDetail() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    // const announce = useSelector(state => state.productReducer);
    const params = useParams();
    const annCode = params.annCode;
    const [amount, setAmount] = useState(1);
    
    useEffect(() => {
        dispatch(callAnnounceDetailAPI({ annCode }));
        },
        []
    );

    // 목록 버튼 클릭 시 목록으로 돌아가는 이벤트

    return (
        <div>
            
        </div>
    );
}

export default AnnounceDetail;
