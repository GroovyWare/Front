import { useNavigate } from "react-router-dom";
import AttendanceItem from "./AttendanceItem";
import AttendanceAdminCSS from "./AttendanceAdmin.module.css";

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

        {/* 상태 표시 */}

        <div className={AttendanceAdminCSS.pageTitle}>근태관리</div>

        <div className={AttendanceAdminCSS.boxWrap}>
            <div>
                <div className={AttendanceAdminCSS.attCumm}></div>
                <div className={AttendanceAdminCSS.attCummText}>정상출근</div>
            </div>
            <div>
                <div className={AttendanceAdminCSS.attVac}></div>
                <div className={AttendanceAdminCSS.attVacText}>연차</div>
            </div>
            <div>
                <div className={AttendanceAdminCSS.attLate}></div>
                <div className={AttendanceAdminCSS.attLateText}>지각</div>
            </div>

            <div className={AttendanceAdminCSS.pageMiddleTitle}>2023-05</div>
        </div>

        {/* 리스트 타이틀 */}

        <table className={AttendanceAdminCSS.contentTb}>
        
            <th className={AttendanceAdminCSS.listTitleName}>직원명</th>

            {Array.from({ length: 31 }, (_, index) => (
                <th key={index}>
                    <td className={AttendanceAdminCSS.listTitle}>{index + 1}</td>
                </th>
            ))}

        </table>



        {/* 세부정보 */}
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