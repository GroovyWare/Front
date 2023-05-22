import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceDetailAPI } from "../../../api/AnnounceAPICalls";

function AnnounceDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const announce = useSelector(state => state.announceReducer);
    const annCode = params.annCode;

    useEffect(() => {
        dispatch(callAnnounceDetailAPI({ annCode }));
    }, [annCode, dispatch]);

    return (
        <div>
            <h2>{announce.annTitle}</h2>
            <p>{`${announce?.employee?.empName}`}</p>
            <p>{`${new Date(announce.annDate).toLocaleString()}`}</p>
            <p>{announce.annContent}</p>
        </div>
    );
}

export default AnnounceDetail;
