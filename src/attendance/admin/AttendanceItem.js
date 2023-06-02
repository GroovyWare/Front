import { useNavigate } from "react-router-dom";

function AttendanceItem({ attendance : { attCode, employee, attStart, attEnd, attDate, attLate } }) {

    const navigate = useNavigate();
    const onClickAttendanceHandler = () => {
        navigate(`/attendance/detail/${employee.empCode}`)
    }

    return(
        <>
        {attCode && attCode > 0 &&( 
            <div
            onClick={ () => onClickAttendanceHandler(employee.empCode) }
            >
            <table> 
                <tr>
                    <td>{ attCode }</td>
                    <td>{ employee.empCode }</td>
                    <td>{ attStart }</td>
                    <td>{ attEnd }</td>
                    <td>{ attDate }</td>
                    <td>{ attLate }</td>
                </tr>
            </table>
            </div>
            )}
        </>
    );
}

export default AttendanceItem;