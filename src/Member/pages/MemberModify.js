import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailReadModifyAPI, callMemberModifyAPI } from "../../api/MemberAPICalls";


function MemberModify() {

    const { memCode } = useParams();
    const data = useSelector(state => state.memberReducer);
    const { modify } = useSelector(state => state.memberReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[form, setForm] = useState({});
    


    /* 읽기 모드, 수정 모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 회원 상세정보 조회 */
    useEffect(
        () => {
            dispatch(callMemberDetailReadModifyAPI({ memCode }));   
        },
        [modify]
        );
    
    /* 회원 수정완료 후 이동 */
    useEffect(
        () => {
            if(modify?.status === 200) {
                alert('회원 수정이 완료되었습니다.');
                navigate('/member/detail/${memCode}',{ replace : true });
            }
        },
        []
    );


    /* 수정 모드 변경 이벤트 */
    const onclickMemberModifyModeHandler = () => {
        setForm({ 
            ...data, 
            passCode : data.history[0]?.pass.passCode,
            empCode :  data.history[0]?.employee.empCode 
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
        formData.append("memEtc", form.memEtc);
        formData.append("history[0].resStart", form.memStartDate);
        formData.append("history[0].resEnd", form.memEndDate);
        formData.append("history[0].pass.passCode", form.passCode);
        formData.append("history[0].employee.empCode", form.empCode);

        dispatch(callMemberModifyAPI(formData));
    }

   
    /* 오늘 날짜 가져오기 */
    function getToday() {     
        const today = new Date();
        return today.getFullYear() + "-" + ((today.getMonth()+1)>9 ? (today.getMonth()+1) : "0"+(today.getMonth()+1)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }

    const inputStyleMemCode = !modifyMode ? { backgroundColor : 'gray'} : { backgroundColor : 'gray'};
    const inputStyle = !modifyMode ? { backgroundColor : 'gray'} : null;
    const checkValuePass = data.history[0]?.pass.passCode;
    const checkValueEmp = data.history[0]?.employee.empCode;

    return(
        <>
        <div>회원 수정</div>
        
            <table>
                <tbody>
                <tr>
                        <td><label>회원번호</label></td>
                        <td>
                            <input
                                name='memCode'
                                onChange={ onChangeHandler }
                                value={ data.memCode }
                                readOnly={ modifyMode }
                                style={ inputStyleMemCode }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>회원이름</label></td>
                        <td>
                            <input
                                name='memName'
                                onChange={ onChangeHandler }
                                value={ !modifyMode ? data.memName : form.memName }
                                readOnly={ !modifyMode }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>전화번호</label></td>
                        <td>
                            <input
                                name='memPhone'
                                onChange={ onChangeHandler }
                                value={ !modifyMode ? data.memPhone : form.memPhone }
                                readOnly={ !modifyMode }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>회원권</label></td>
                        <td>
                            <select
                                name='passCode'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? checkValuePass : form.passCode }
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
                        <td><label>시작일</label></td>
                        <td>
                            <input 
                                type='date'
                                name='memStartDate'
                                min={ getToday() }
                                value={ !modifyMode ? data.memStartDate : form.memStartDate }
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>종료일</label></td>
                        <td>
                            <input
                                type='date'
                                name='memEndDate'
                                min={ getToday() }
                                value={ !modifyMode ? data.memEndDate : form.memEndDate }
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>삭제일</label></td>
                        <td>
                            <input
                                type='date'
                                name='memDeleteDate'
                                min={ getToday() }
                                value={ !modifyMode ? data.memDeleteDate : form.memDeleteDate }
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>담당자</label></td>
                        <td>
                        <select
                                name='empCode'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? checkValueEmp : form.empCode }
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

                    <tr>
                        <td><label>비고</label></td>
                        <td>
                            <input
                                name='memEtc'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                </tbody>
            </table>
        
        <div>
        <button
                onClick={ onclickMemberModifyModeHandler }
            >
                수정모드
            </button>
            <button
                onClick={ onClickMemberUpdateHandler }
            >
                등록
            </button>

            <button
                onClick={ () => navigate(-1) }
            >
                취소
            </button>
        </div>

        </>
    );
}

export default MemberModify;

