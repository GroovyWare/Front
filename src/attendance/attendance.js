import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { callGetUserAPI } from "../api/LoginAPICalls";
import NavbarCSS from '../components/common/Navbar.module.css';
import profileImg from '../components/common/img/profile_default.svg';
import { AttendanceMain, goWork, leaveWork } from "../api/AttendanceAPICalls";
import { viewMain } from "../modules/AttendanceModule";
import { toBeDisabled } from "@testing-library/jest-dom/matchers";
import attendanceCSS from "./attendance.module.css"

/* 근태 테이블 작성 */
const Attendance = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const { user } = useSelector(state => state.loginReducer);
    const { attendance } = useSelector(state => state.attendanceReducer);
    const { regist } = useSelector(state => state.attendanceReducer);
    const { update } = useSelector(state => state.attendanceReducer);
    const [time, setTime] = useState(new Date());
    const [disableGoWorkButton, setDisableGoWorkButton] = useState(false);

    const goWorking = () => {
        dispatch(goWork(form));
        setDisableGoWorkButton(true);
    }

    const leavingWork = () => {
        dispatch(leaveWork(form))
    }

  

    
    const convertToValidDate = (timeString) => {
        const today = new Date().toLocaleDateString(); // 현재 날짜를 YYYY-MM-DD 형식으로 가져옴
        const validDateTimeString = `${today} ${timeString}`; // 현재 날짜와 시간을 결합하여 유효한 날짜 형식 생성
        return new Date(validDateTimeString); // 유효한 날짜 형식으로 변환한 날짜 객체 반환
      };
      
      const workingTimes = (start, end) => {
        if (start && end) {
          const startTime = convertToValidDate(start);
          const endTime = convertToValidDate(end);
      
          if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            return null; // 잘못된 날짜 형식
          }
      
          const diff = endTime.getTime() - startTime.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          return `${hours}시간 ${minutes}분`;
        }
        return null;
      };
      
      
      



    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        dispatch(callGetUserAPI());
        dispatch(AttendanceMain());
    }, []);

    useEffect(() => {
        if (regist?.status === 200) {
            dispatch(AttendanceMain());
        }
    }, [regist]);

    useEffect(() => {
        if (update?.status === 200) {
            dispatch(AttendanceMain());
        }
    }, [update]);


   

    return (
        <div className={attendanceCSS.container}>
            <div className={attendanceCSS.bg}>
                <div className={attendanceCSS.nowtime}>
                        <label>오늘 날짜 : </label>
                        <div>{time.toLocaleDateString()}</div>
                        <div>{time.toLocaleTimeString()}</div>           
                </div>
                <div className={attendanceCSS.info}>
                    {/* 유저 정보 표시 */}
                    {user && (
                        <div className={attendanceCSS.userDiv}>
                            <div className={NavbarCSS.profileBox}>
                                {user.data.file !== null ? (
                                    <img src={user.data?.file.fileSavedName} alt="프로필" className={NavbarCSS.profile} />
                                ) : (
                                    <img src={profileImg} alt="프로필" className={NavbarCSS.profile} />
                                )}
                            </div>
                            <div className={NavbarCSS.userName}>
                                {user.data.dept.deptTitle}팀&nbsp;{user.data.empName}&nbsp;
                            </div>
                        </div>
                    )}
                <div className={attendanceCSS.whole}>
                    <div className={attendanceCSS.working}>

                        <div className={attendanceCSS.gowork}>
                            <label>출근 시간 :</label>
                            {attendance && attendance.data && attendance.data.attStart ? (
                                attendance.data.attStart
                            ) : (
                                time.toLocaleTimeString()
                            )}
                             {!attendance?.data?.attStart && (
                            <button onClick={goWorking}
                                className={attendanceCSS.buttons}>
                                출근
                            </button>
                        )}
                        </div>

                        </div>
                        <div className={attendanceCSS.leaving}>
                             <label>퇴근 시간 :</label>
                            {attendance && attendance.data && attendance.data.attEnd ? (
                                attendance.data.attEnd
                            ) : (
                                time.toLocaleTimeString()
                            )}
                            {!attendance?.data?.attEnd && (
                                <button onClick={leavingWork} className={attendanceCSS.buttons}>
                                    퇴근
                                </button>
                            )}
                        </div>
                </div>
                </div>


                <div className={attendanceCSS.workingTime}>
                    <label>근무시간:</label>
                    {attendance?.data?.attEnd && attendance?.data?.attStart ? (
                        workingTimes(attendance.data.attStart, attendance.data.attEnd)
                    ) : null}

                </div>

            </div>
        </div>
    );
}

export default Attendance;
