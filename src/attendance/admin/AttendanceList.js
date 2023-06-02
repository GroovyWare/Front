import { useNavigate } from "react-router-dom";
import AttendanceItem from "./AttendanceItem";

function AttendanceList({attendanceList}) {
       
    
    return(
        <>
            <div>
                근태관리
            </div>
            <div>
                정상출근
                <div></div>
            </div>
            <div>
                연차
            </div>
            <div>
                지각
            </div>

            <div>
                {
                    Array.isArray(attendanceList)
                    && attendanceList.map(attendance => <AttendanceItem key={attendance.attCode} attendance={attendance}/>)
                }
            </div>
        </>
    );
}

export default AttendanceList;