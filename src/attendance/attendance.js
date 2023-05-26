import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getOneAttendance } from "../modules/AttendanceModule";
import { callGetUserAPI } from "../api/LoginAPICalls";
import NavbarCSS from '../components/common/Navbar.module.css'
import profileImg from '../components/common/img/profile_default.svg'

/* 근태 테이블 작성 */
const Attendance = () => {
    const dispatch = useDispatch();
    
    const { user } = useSelector(state => state.loginReducer);
    const times = useSelector(state => state.attendanceReducer);
    
  
    
    
    
    useEffect(
        () => {
            dispatch(callGetUserAPI());
        },
        []
    );

    // useEffect(
    //     () => {
    //         dispatch(getOneAttendance());
    //     }
    // )



return (
    <div>

        <div> 이곳이 감싸주는 div 입니다.
        <div>
            {/* 여기에 멤버의 정보를 모두 나타낼겁니다. */}
            { user &&   
            <div className={ NavbarCSS.profileDiv }>
                
                <div className={ NavbarCSS.profileBox }>
                { user.data.file !== null &&
                    <img src={ user.data?.file.fileSavedName } alt="프로필" className= { NavbarCSS.profile }/>
                }
                { user.data.file === null &&
                    <img src={ profileImg } alt="프로필" className= { NavbarCSS.profile }/>
                }
                </div>
                    <div className={ NavbarCSS.userName }>{ user.data.dept.deptTitle }팀&nbsp;{ user.data.empName }&nbsp;</div>
            </div>
            }

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

export default Attendance;