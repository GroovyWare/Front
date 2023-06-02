import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttendanceList from "./AttendanceList";
import PagingBar from "../../components/common/PagingBar";
import { callAttendanceListAPI } from "../../api/AttendanceAPICalls";

function AttendanceMain() {

    const dispatch = useDispatch();
    const attendances = useSelector(state => state.attendanceReducer);
    const attendanceList = attendances.data;
    const pageInfo = attendances.pageInfo;


    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callAttendanceListAPI({ currentPage }));
        },
        [currentPage]
    );

    return (
        <>
            <div>
                { attendanceList && <AttendanceList attendanceList={attendanceList}/> }
            </div>
            <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={setCurrentPage}/> }
            </div>
        
        </>
    );
}

export default AttendanceMain;