import { useDispatch, useSelector } from "react-redux"

/* 근태 테이블 작성 */
const Attendance = () => {
    const dispatch = useDispatch();
    
    const employees = useSelector(state => state.employeeReducer);
    const times = useSelector(state => state.attendanceReducer);
    
    




return (
    <div>

        <div> 이곳이 감싸주는 div 입니다.
        <div>
            여기에 멤버의 정보를 모두 나타낼겁니다.

            <div>
             여기가 사진
            </div>

            <div>
                여기가 이름
            </div>

            <div>
                여기가 부서
            </div>

        </div>


        <div>
            여기가 출근 버튼
        </div>
        <div>
            여기가 퇴근 버튼
        </div>

        </div>



















    </div>


)


}