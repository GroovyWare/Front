import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callMemberRegistAPI } from "../../api/MemberAPICalls";
import MemberRegistCSS from "./MemberRegist.module.css";


function MemberRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { regist } = useSelector(state => state.memberReducer);
    const [form, setForm] = useState({
        memStartDate : getToday(),
        memDeleteDate : getFiveYear(),
        memEndDate: getThreeMonth(),
        passCode : 1,
        empcode : 1
    });


    
    /* 회원 등록 완료 후 리스트로 이동 */
    useEffect(
        () => {
            if(regist?.status === 200) {
                alert('회원 등록이 완료되었습니다.');
                navigate('/member', { replace : true });
            }
        },
        [regist]
    );

    /* 입력 양식 값 변경될 때 */
    const onChangeHandler= (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    
    /* 회원등록 버튼 클릭 */
    const onClickMemberRegistHandler = () => {

        /* 서버로 전달할 formData 형태의 객체 설정 */
        const formData = new FormData();

        formData.append("memName", form.memName);
        formData.append("memPhone", form.memPhone);
        formData.append("memStartDate", form.memStartDate);
        formData.append("memEndDate", form.memEndDate);
        formData.append("memDeleteDate", form.memDeleteDate);
        formData.append("memEtc", form.memEtc);
        formData.append("history[0].resStart", form.memStartDate);
        formData.append("history[0].resEnd", form.memEndDate);
        formData.append("history[0].pass.passCode", form.passCode);
        formData.append("history[0].employee.empCode", form.empCode);

        dispatch(callMemberRegistAPI(formData));
    }

    /* 오늘 날짜 가져오기 */
    function getToday() {     
        const today = new Date();
        return today.getFullYear() + "-" + ((today.getMonth()+1)>9 ? (today.getMonth()+1) : "0"+(today.getMonth()+1)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }


    /* 5년 뒤 날짜 가져오기 */
    function getFiveYear() {     
        const today = new Date();
        return today.getFullYear() + 5 + "-" + ((today.getMonth()+1)>9 ? (today.getMonth()+1) : "0"+(today.getMonth()+1)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }

    /* 1년 뒤 날짜 가져오기 */
    function getOneYear() {     
        const today = new Date();
        return today.getFullYear() + 1 + "-" + ((today.getMonth()+1)>9 ? (today.getMonth()+1) : "0"+(today.getMonth()+1)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }

    /* 3개월 뒤 날짜 가져오기 */
    function getThreeMonth() {     
        const today = new Date();
        return today.getFullYear() + "-" + ((today.getMonth()+4)>9 ? (today.getMonth()+4) : "0"+(today.getMonth()+4)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }

    /* 6개월 뒤 날짜 가져오기 */
    function getSixMonth() {     
        const today = new Date();
        return today.getFullYear() + "-" + ((today.getMonth()+7)>9 ? (today.getMonth()+7) : "0"+(today.getMonth()+7)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }


    return (
        <>
        <div className={MemberRegistCSS.pageTitle}>회원 등록</div>
            <div className={MemberRegistCSS.contentWrap}>
            
                <table className={MemberRegistCSS.contentTb}>
                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>회원이름</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                                <input
                                    className={MemberRegistCSS.memberInput}
                                    name='memName'
                                    placeholder='회원 이름'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>전화번호</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                                <input
                                    name='memPhone'
                                    placeholder='숫자만 입력하세요'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>회원권</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                                <select
                                    name='passCode'
                                    onChange={ onChangeHandler }
                                >
                                    <option>선택하세요</option>
                                    <option value="1">3개월</option>
                                    <option value="2">6개월</option>
                                    <option value="3">12개월</option>
                                    <option value="4">PT</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>시작일</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                                <input
                                    className={MemberRegistCSS.dateStyle} 
                                    type='date'
                                    min={ getToday() }
                                    name='memStartDate'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>종료일</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                                <input
                                    className={MemberRegistCSS.dateStyle}
                                    type='date'
                                    name='memEndDate'
                                    min={ getToday() }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>삭제일</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                                <input
                                    className={MemberRegistCSS.dateStyle}
                                    type='date'
                                    name='memDeleteDate'
                                    min={ getFiveYear() }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>담당자</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                            <select
                                    name='empCode'
                                    onChange={ onChangeHandler }
                                >
                                    <option>선택하세요</option>
                                    <option value="1">김필라</option>
                                    <option value="2">김건강</option>
                                    <option value="3">김자자</option>
                                    <option value="4">피사번</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td className={MemberRegistCSS.contentTitle} colspan="3"><label>비고</label></td>
                            <td className={MemberRegistCSS.contentText} colspan="3">
                                <input
                                    name='memEtc'
                                    placeholder='비고'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                </table>
            
            <div className={MemberRegistCSS.btnWrap}>
                <div>
                <button
                    className={MemberRegistCSS.registBtn}
                    onClick={ onClickMemberRegistHandler }
                >
                    등록하기
                </button>
                </div>

                <div>
                <button
                    className={MemberRegistCSS.cancelBtn}
                    onClick={ () => navigate(-1) }
                >
                    취소하기
                </button>
                </div>
            </div>
        </div>
            </>
        );
}

export default MemberRegist;