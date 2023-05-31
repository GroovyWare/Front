import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailReadModifyAPI, callMemberAddPassAPI } from "../../api/MemberAPICalls";
import MemberModifyCSS from "./MemberModify.module.css";
import { toast } from "react-toastify";

function MemberAddPass() {

    const { memCode } = useParams();
    const info = useSelector(state => state.memberReducer);
    const { addPass } = useSelector(state => state.memberReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[form, setForm] = useState({});
    const[history1, setHistory1] = useState({});

    
    /* 읽기 모드, 수정 모드 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 회원 상세정보 조회 */
    useEffect(
        () => {
            dispatch(callMemberDetailReadModifyAPI({ memCode }));   
        }, []);
    
    /* 회원 수정완료 후 이동 */
    useEffect(
        () => {
            if(addPass?.status === 200) {
                toast('회원권 수정이 완료되었습니다.');
                navigate(`/member/detail/${memCode}`, { replace : true });
            }
        },
        [addPass]
    );

    /* 수정 모드 변경 이벤트 */
    const onclickMemberModifyModeHandler = () => {
        setForm({ 
            ...info,    
            passCode : info.history[0]?.pass.passCode,
            empCode : info.history[0]?.employee.empCode,
        });
        setModifyMode(true);
    }

    /* 입력 양식 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    /* 회원 수정 저장 버튼 클릭 이벤트 */
    const onClickMemberUpdateHandler = () => {

        /* 서버로 전달할 formData 형태의 객체 설정 */
        const formData = new FormData();    

        formData.append("memCode", form.memCode);
        formData.append("memName", form.memName);
        formData.append("memPhone", form.memPhone);
        formData.append("memStartDate", form.memStartDate);
        formData.append("memEndDate", form.memEndDate);
        formData.append("memDeleteDate", form.memDeleteDate);

        formData.append("history[0].memCode", form.memCode);
        formData.append("history[0].resStart", form.memStartDate);
        formData.append("history[0].resEnd", form.memEndDate);
        formData.append("history[0].pass.passCode", form.passCode);
        formData.append("history[0].employee.empCode", form.empCode);

        dispatch(callMemberAddPassAPI(formData));
    }

    /* 오늘 날짜 가져오기 */
    function getToday() {     
        const today = new Date();
        return today.getFullYear() + "-" + ((today.getMonth()+1)>9 ? (today.getMonth()+1) : "0"+(today.getMonth()+1)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }

    const inputStyleMemCode = !modifyMode ? { backgroundColor : 'rgb(145, 146, 155)'} : { backgroundColor : 'rgb(145, 146, 155)'};
    const inputStyle = !modifyMode ? { backgroundColor : 'rgb(145, 146, 155)'} : null;
    const modifyState = !modifyMode ? null : { backgroundColor : 'gray', border : 'gray'};

    return(
        <>
        <div className={MemberModifyCSS.pageTitle}>회원권 추가</div>
        <div className={MemberModifyCSS.contentWrap}>
            <table className={MemberModifyCSS.contentTb}>
                <tbody>
                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>회원번호</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                name='memCode'
                                value={ !modifyMode ? info.history[0]?.memCode : form.memCode }
                                readOnly={ modifyMode }
                                style={ inputStyleMemCode }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>회원권</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <select
                                name='passCode'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? info.history[0]?.pass.passCode : form.passCode }
                            >
                                <option>선택하세요</option>

                                <option value={1}
                                        readOnly={ !modifyMode }>3개월</option>

                                <option value={2}
                                        readOnly={ !modifyMode }>6개월</option>

                                <option value={3}
                                        readOnly={ !modifyMode }>12개월</option>

                                <option value={4}
                                        readOnly={ !modifyMode }>PT</option>

                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>시작일</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input 
                                className={MemberModifyCSS.dateStyle}
                                type='date'
                                min={ getToday() }
                                name='memStartDate'
                                value={ !modifyMode ? info.memStartDate : form.memStartDate }
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>종료일</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                className={MemberModifyCSS.dateStyle}
                                type='date'
                                min={ getToday() }
                                name='memEndDate'
                                value={ !modifyMode ? info.memEndDate : form.memEndDate }
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>삭제일</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                className={MemberModifyCSS.dateStyle}
                                type='date'
                                min={ getToday() }
                                name='memDeleteDate'
                                value={ !modifyMode ? info.memDeleteDate : form.memDeleteDate }
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>담당자</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                        <select
                                name='empCode'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? info.history[0]?.employee.empCode : form.empCode }
                            >
                                <option>선택하세요</option>
                                <option value={1}
                                        readOnly={ !modifyMode }>김필라</option>
                                <option value={2}
                                        readOnly={ !modifyMode }>김건강</option>
                                <option value={3}
                                        readOnly={ !modifyMode }>김자자</option>
                                <option value={4}
                                        readOnly={ !modifyMode }>피사번</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        
        <div>
            <button
                className={MemberModifyCSS.modifyBtn}
                onClick={ onclickMemberModifyModeHandler }
                disabled={ modifyMode }
                style={modifyState}
            >
                수정모드
            </button>
            <button
                className={MemberModifyCSS.registBtn}
                onClick={ onClickMemberUpdateHandler }
            >
                등록하기
            </button>

            <button
                className={MemberModifyCSS.cancelBtn}
                onClick={ () => navigate(-1) }
            >
                취소하기
            </button>
        </div>
        </div>

        </>
    );
}

export default MemberAddPass;

