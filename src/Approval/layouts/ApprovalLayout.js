import { Outlet } from "react-router-dom";
import ApvNavbar from "../common/ApvNavbar";


function ApprovalLayout(){
    return(
        <>
            <ApvNavbar/>
            <Outlet/>
        </>
    )
}

export default ApprovalLayout;