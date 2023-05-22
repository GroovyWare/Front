import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchDocumentList } from "./api/ApprovalAPICall";
import ApvVacationDoc from "./Approval/pages/document/ApvVacationDoc";


export default function Test2(){

    const dispatch = useDispatch();
    const {document} = useSelector(state => state.approvalReducer);

    useEffect(
        () => {
            dispatch(searchDocumentList());
        },[]
    )
    


    return(
        <>
        {
            document && 
                <ApvVacationDoc/>
        }
        </>
    )
}