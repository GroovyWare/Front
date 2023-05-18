import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchDocumentList } from "./api/ApprovalAPICall";


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
            <div dangerouslySetInnerHTML={{ __html: document.data.docCustom }}>
            </div>
        }
        </>
    )
}