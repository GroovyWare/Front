import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailReadModifyAPI, callMemberRegistAPI } from "../../api/MemberAPICalls";


function MemberModify() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { memCode } = useParams();
    const data = useSelector(state => state.memberReducer);
    const { modify } = useSelector((state => state.memberReducer));
    const[form, setForm] = useState({});


    /* 읽기 모드, 수정 모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 회원 상세정보 조회 */
    useEffect(
        () => {
            dispatch(callMemberDetailReadModifyAPI({ memCode }));
        },
        []);

    /* 회원 수정완료 후 이동 */
    useEffect(
        () => {
            if(modify?.state === 200) {
                alert('회원 수정이 완료되었습니다.');
                navigate('/member',{ replace : true });
            }
        },
        [modify]
    );

    /* 입력 양식 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    /* 회원권 변경될 때 */
    const onChangePassHandler = (e) => {
        setForm({
            ...form,
            pass : { passCode : e.target.value }
        })
    }

    /* 수정 모드 변경 이벤트 */
    const onclickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({ ...data });
    }

    /* 회원 수정 저장 버튼 클릭 이벤트 */
    const onClickMemberModifyHandler = () => {

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

    const inputStyle = !modifyMode ? { backgroundColor : 'gray'} : null;
    const checkValue = !modifyMode ? data.history?.pass.passType : form.history.pass.passType;

    return(
        <>
        <div>회원 수정</div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><label>회원이름</label></td>
                        <td>
                            <input
                                name='memName'
                                placeholder='회원 이름'
                                onChange={ onChangeHandler }
                                value={ !modifyMode ? data.memName : form.memName }
                                readOnly={ !modifyMode }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>전화번호</label></td>
                        <td>
                            <input
                                name='memPhone'
                                placeholder='숫자만 입력하세요'
                                onChange={ onChangeHandler }
                                value={ !modifyMode ? data.memPhone : form.memPhone }
                                readOnly={ !modifyMode }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>회원권</label></td>
                        <td>
                            <select
                                name='passCode'
                                onChange={ onChangePassHandler }
                            >
                                <option>선택하세요</option>
                                <option value={1} checked={ checkValue === 1 } readOnly={ !modifyMode }>3개월</option>
                                <option value={2} checked={ checkValue === 2 } readOnly={ !modifyMode }>6개월</option>
                                <option value={3} checked={ checkValue === 3 } readOnly={ !modifyMode }>12개월</option>
                                <option value={4} checked={ checkValue === 4 } readOnly={ !modifyMode }>PT</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td><label>시작일</label></td>
                        <td>
                            <input 
                                type='date'
                                name='memStartDate'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>종료일</label></td>
                        <td>
                            <input
                                type='date'
                                name='memEndDate'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>삭제일</label></td>
                        <td>
                            <input
                                type='date'
                                name='memDeleteDate'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>담당자</label></td>
                        <td>
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
                        <td><label>비고</label></td>
                        <td>
                            <input
                                name='memEtc'
                                placeholder='비고'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>


        <div>
            <button
                onClick={ onClickMemberModifyHandler }
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

