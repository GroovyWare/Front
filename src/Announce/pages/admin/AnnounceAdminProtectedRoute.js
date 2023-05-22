import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AnnounceAdminProtectedRoute({ children }) {
  const userRole = useSelector(state => state.loginReducer); // Replace this line with your user role checking logic

  if (userRole === '1') {
    return children;
  } else {
    return <Navigate to="/announce" />;
  }
}

export default AnnounceAdminProtectedRoute;
