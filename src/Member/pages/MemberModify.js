import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailReadModifyAPI, callMemberModifyAPI } from "../../api/MemberAPICalls";
import MemberModifyCSS from "./MemberModify.module.css";
import { toast } from "react-toastify";

function MemberModify() {

    const { memCode } = useParams();
    const info = useSelector(state => state.memberReducer);
    const { modify } = useSelector(state => state.memberReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[form, setForm] = useState({});
    
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
            if(modify?.status === 200) {
                toast('회원 수정이 완료되었습니다.');
                navigate(`/member/detail/${memCode}`, { replace : true });
            }
        },
        [modify]
    );

    /* 수정 모드 변경 이벤트 */
    const onclickMemberModifyModeHandler = () => {
        setForm({ 
            ...info, 
            passCode : info.history[0]?.pass.passCode,
            empCode: info.history[0]?.employee.empCode || "",
            memCode : info.history[0]?.memCode
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
        formData.append("memEtc", form.memEtc);

        dispatch(callMemberModifyAPI(formData));
    }


    const inputStyleMemCode = !modifyMode ? { backgroundColor : 'rgb(145, 146, 155)'} : { backgroundColor : 'rgb(145, 146, 155)'};
    const inputStyle = !modifyMode ? { backgroundColor : 'rgb(145, 146, 155)'} : null;
    const modifyState = !modifyMode ? null : { backgroundColor : 'gray', border : 'gray'};

    return(
        <>
        <div className={MemberModifyCSS.pageTitle}>회원 수정</div>
        <div className={MemberModifyCSS.contentWrap}>
            <table className={MemberModifyCSS.contentTb}>
                <tbody>
                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>회원번호</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                name='memCode'
                                value={ info.memCode }
                                readOnly={ modifyMode }
                                style={ inputStyleMemCode }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>회원이름</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                name='memName'
                                onChange={ onChangeHandler }
                                value={ !modifyMode ? info.memName : form.memName }
                                readOnly={ !modifyMode }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>전화번호</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                name='memPhone'
                                onChange={ onChangeHandler }
                                value={ !modifyMode ? info.memPhone : form.memPhone }
                                readOnly={ !modifyMode }
                                style={ inputStyle }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>비고</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                name='memEtc'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? info.memEtc : form.memEtc }
                                readOnly={ !modifyMode }
                            />
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

export default MemberModify;

