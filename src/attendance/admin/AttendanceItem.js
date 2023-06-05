import { useNavigate } from "react-router-dom";
import AttendanceAdminCSS from "./AttendanceAdmin.module.css";

function AttendanceItem({ attendance }) {

    const navigate = useNavigate();
    const onClickAttendanceHandler = () => {
        navigate(`/attendance/detail/${attendance.employee.empCode}`)
    }

    const isLate = attendance.attStart > "10:00:00";

    return(
        <>
        {attendance.attCode && attendance.attCode > 0 && (
          <div onClick={() => onClickAttendanceHandler(attendance.employee.empCode)}>
            <table className={AttendanceAdminCSS.tableWarp}>
              <tr>
                <td className={AttendanceAdminCSS.contentText}>
                  {attendance.employee.empName}
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

                <td className={AttendanceAdminCSS.contentBox}>
                  <div 
                  className={`${AttendanceAdminCSS.contentTextBox} ${
                    isLate ? AttendanceAdminCSS.redBox : AttendanceAdminCSS.blueBox}`}
                  >{/* AttStart value is not displayed */}</div>
                </td>

              </tr>
            </table>
          </div>
        )}
      </>
    );
}

export default AttendanceItem;