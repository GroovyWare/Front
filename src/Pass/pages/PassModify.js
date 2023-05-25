import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callPassDetailReadModifyAPI, callPassModifyAPI } from "../../api/PassAPICalls";
import PassCSS from "./Pass.module.css";

function PassModify(){
    const{ passCode } = useParams();
    const info = useSelector(state => state.passReducer);
    const { modify } = useSelector(state => state.passReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[form, setForm] = useState({});

    /* 읽기 모드, 수정 모드 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 회원권 상세 조회 */
    useEffect(
        () => {
            dispatch(callPassDetailReadModifyAPI({ passCode }));
        }, []);
    
    /* 회원권 수정 완료 후 이동 */
    useEffect(
        () => {
            if(modify?.status === 200) {
                alert('회원권 수정이 완료되었습니다.');
                navigate(`/pass/modify/${passCode}`, { replace : true });
            }
        },[modify]
    );

    /* 수정 모드 변경 이벤트 */
    const onClickPassModifyHandler = () => {
        setForm({
            ...info
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

    /* 회원권 수정 저장 버튼 이벤트 */
    const onClickPassUpdateHandler = () => {
        /* 서버로 전달할 form 행태의 객체 설정 */
        const formData = new FormData();

        formData.append("passCode", info.passCode);

        formData.append("passType", form.passType);
        formData.append("passEtc", form.passEtc);
        formData.append("passPrice", form.passPrice);
        formData.append("passAmount", form.passAmount);

        dispatch(callPassModifyAPI(formData));
    }

    const inputStylePassCode = !modifyMode ? { backgroundColor : 'rgb(145, 146, 155)'} : { backgroundColor : 'rgb(145, 146, 155)'};
    const inputStyle = !modifyMode ? { backgroundColor : 'rgb(145, 146, 155)'} : null;


    return(
        <>
        
        <div className={PassCSS.pageTitle}>회원권 수정</div>
        <div className={PassCSS.contentWrap}>
            <table className={PassCSS.contentTb}>
                    <tbody>
                    <tr>
                        <td className={PassCSS.contentTitle} colspan="3"><label>회원권 번호</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <input
                                name='passCode'
                                onChange={ onChangeHandler }
                                value={ info.passCode }
                                readOnly={ modifyMode }
                                style={ inputStylePassCode }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={PassCSS.contentTitle}><label>회원권</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <select
                                name='passType'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? info.passType : form.passType }
                            >
                                
                                <option>선택하세요</option>
                                <option value="3개월"
                                        readOnly={ !modifyMode }>3개월</option>
                                <option value="6개월"
                                        readOnly={ !modifyMode }>6개월</option>
                                <option value="12개월"
                                        readOnly={ !modifyMode }>12개월</option>
                                <option value="PT"
                                        readOnly={ !modifyMode }>PT</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className={PassCSS.contentTitle}><label>가격</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <input
                                name='passPrice'
                                type='number'
                                onChange={ onChangeHandler }
                                value={ !modifyMode ? info.passPrice : form.passPrice }
                                readOnly={ !modifyMode }
                                style={ inputStyle }
                                
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={PassCSS.contentTitle}><label>횟수</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <input
                                name='passAmount'
                                type='number'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? info.passAmount : form.passAmount }
                                readOnly={ !modifyMode }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={PassCSS.contentTitle}><label>비고</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <input
                                name='passEtc'
                                onChange={ onChangeHandler }
                                style={ inputStyle }
                                value={ !modifyMode ? info.passEtc : form.passEtc }
                                readOnly={ !modifyMode }
                            />
                        </td>
                    </tr>
                
                </tbody>
            </table>

        <div className={PassCSS.btnWrap}>
            <div>
            <button
                className={PassCSS.registBtn}
                onClick={ onClickPassModifyHandler }
            >
                수정모드
            </button>
            <button
                className={PassCSS.registBtn}
                onClick={ onClickPassUpdateHandler }
            >
                수정하기
            </button>
            </div>

            <div>
            <button
                className={PassCSS.cancelBtn}
                onClick={ () => navigate(-1) }
            >
                취소
            </button>
            </div>
        </div>

        </div>

        </>
    );
}

export default PassModify;