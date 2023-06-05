import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callAttendanceDetailAPI } from "../../api/AttendanceAPICalls";
import AttendanceDetailAdminCSS from "./AttendanceDetailAdmin.module.css";

function AttendanceDetail() {

    const dispatch = useDispatch();
    const attendance = useSelector((state) => state.attendanceReducer);
    const params = useParams();
    const empCode = params.empCode;
    
    useEffect(() => {
        dispatch(callAttendanceDetailAPI({empCode}));
    }, []);


    return(
        <>
        <div className={AttendanceDetailAdminCSS.pageTitle}>근태 현황</div>
        {empCode && empCode > 0 &&(
        <div className={AttendanceDetailAdminCSS.contentWrap}>
          <div className={AttendanceDetailAdminCSS.contentTitle}>
            <div className={AttendanceDetailAdminCSS.contentText}>직원 이름 : </div>
            <div className={AttendanceDetailAdminCSS.contentText}>{attendance.employee.empName}</div>
          </div>
          <div className={AttendanceDetailAdminCSS.contentTitle}>
            <div className={AttendanceDetailAdminCSS.contentText}>직원 코드 : </div>
            <div className={AttendanceDetailAdminCSS.contentText}>{attendance.employee.empCode}</div>
          </div>
          <div className={AttendanceDetailAdminCSS.contentTitle}>
            <div className={AttendanceDetailAdminCSS.contentText}>부서명 : </div>
            <div className={AttendanceDetailAdminCSS.contentText}>{attendance.employee.dept.deptTitle}</div>
          </div>
          <div className={AttendanceDetailAdminCSS.contentTitle}>
            <div className={AttendanceDetailAdminCSS.contentText}>직급 : </div>
            <div className={AttendanceDetailAdminCSS.contentText}>{attendance.employee.position.positionName}</div>
          </div>
        </div>
        )}

        {empCode && empCode > 0 &&(
          <table className={AttendanceDetailAdminCSS.tableWrap}>
          <tr>
          <td className={AttendanceDetailAdminCSS.contentTitle2}>일자</td>
          <td className={AttendanceDetailAdminCSS.contentText2}>{attendance.attDate}</td>
          </tr>
          <tr>
            <td className={AttendanceDetailAdminCSS.contentTitle2}>직원번호</td>
            <td className={AttendanceDetailAdminCSS.contentText2}>{attendance.empCode}</td>
          </tr>
          <tr>
            <td className={AttendanceDetailAdminCSS.contentTitle2}>출근시간</td>
            <td className={AttendanceDetailAdminCSS.contentText2}>{attendance.attStart}</td>
          </tr>
          <tr>
            <td className={AttendanceDetailAdminCSS.contentTitle2}>퇴근시간</td>
            <td className={AttendanceDetailAdminCSS.contentText2}>{attendance.attEnd}</td>
          </tr>
          <tr>
            <td className={AttendanceDetailAdminCSS.contentTitle2}>지각</td>
            <td className={AttendanceDetailAdminCSS.contentText2}>{attendance.attLate}</td>
          </tr>
        </table>

        )}
        </>
    );
}

export default AttendanceDetail;