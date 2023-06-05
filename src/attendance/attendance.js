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

    console.log(attendance)




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


    // console.log("form : ", form);

    return (
        <div>
            <div>
                <div>
                    {/* 유저 정보 표시 */}
                    {user && (
                        <div className={NavbarCSS.profileDiv}>
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
                </div>
                <div className={attendanceCSS.whole}>
                    <div className={attendanceCSS.working}>

                        <div className={attendanceCSS.gowork}>
                            <label>  출근 시간 : </label>
                            {attendance && attendance.data && attendance.data.attStart ? (
                                attendance.data.attStart
                            ) : (
                                time.toLocaleTimeString()
                            )}
                        </div>
                        {!attendance?.data?.attStart && (
                            <button onClick={goWorking}
                                className={attendanceCSS.buttons}>
                                출근
                            </button>
                        )}
                    </div>



                    <div>
                        <div className={attendanceCSS.leaving}>
                            퇴근시간 표시
                            {attendance && attendance.data && attendance.data.attEnd ? (
                                attendance.data.attEnd
                            ) : (
                                time.toLocaleTimeString()
                            )}
                            {!attendance?.data?.attEnd &&(
                                <button onClick={leavingWork} className={attendanceCSS.buttons}>
                                퇴근
                             </button>
                            )}
                            
                        </div>
                    </div>
                </div>
                <div className={attendanceCSS.nowtime}>
                    <label>현재시간 : </label>
                    {time.toLocaleTimeString()}
                    <label>오늘날짜 : </label>
                    {time.toLocaleDateString()}

                </div>

            </div>
        </div>
    );
}

export default Attendance;
