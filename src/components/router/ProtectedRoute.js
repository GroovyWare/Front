import { isAdmin, isLogin } from "../../utils/TokenUtils";
import { Navigate } from "react-router-dom";


function ProtecdRoute({ loginCheck, authCheck, children }) {

    if(authCheck) {
        return isAdmin() ? children : <Navigate to="/"/>
    }

    if(loginCheck) {
        return isLogin() ? children : <Navigate to="/login"/>
    }
    
}

export default ProtecdRoute;