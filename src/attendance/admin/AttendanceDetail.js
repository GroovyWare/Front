import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AttendanceDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attendance = useSelector((state) => state.attendanceReducer);



    return(
        <>
        근태 현황
        </>
    );
}

export default AttendanceDetail;