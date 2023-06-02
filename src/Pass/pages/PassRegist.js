import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPassRegistAPI } from "../../api/PassAPICalls";
import PassCSS from "./Pass.module.css";
import { toast } from "react-toastify";


function PassRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { regist } = useSelector(state => state.passReducer);
    const [form, setForm] = useState({
        passAmount : '',
        passEtc : '',
    });

    /* 회원권 등록 후 회원권 리스트로 이동 */
    useEffect(
        () => {
            if(regist?.status === 200){
                toast('회원권 등록이 완료되었습니다.')
                navigate('/pass', { replace : true });
            }
        },
        [regist]
    );

    /* 입력 양식 값이 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    /* 회원권 등록 버튼 이벤트 */
    const onClickPassRegistHandler = () => {

        /* 서버로 전달할 formData 형태의 객체 설정 */
        const formData = new FormData();

        formData.append("passType", form.passType);
        formData.append("passPrice", form.passPrice);
        formData.append("passAmount", form.passAmount);
        formData.append("passEtc", form.passEtc);

        dispatch(callPassRegistAPI(formData));
    }

    return(
        <>
        <div className={PassCSS.pageTitle}>회원권 등록</div>
        <div className={PassCSS.contentWrap}>
            <table className={PassCSS.contentTb}>
                <tbody>
                    <tr>
                        <td className={PassCSS.contentTitle}><label>회원권</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <select
                                name='passType'
                                onChange={ onChangeHandler }
                            >
                                <option>선택하세요</option>
                                <option value="3개월">3개월</option>
                                <option value="6개월">6개월</option>
                                <option value="12개월">12개월</option>
                                <option value="PT">PT</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className={PassCSS.contentTitle}><label>가격</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <input
                                name='passPrice'
                                placeholder='가격'
                                type='number'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={PassCSS.contentTitle}><label>횟수</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <input
                                name='passAmount'
                                placeholder='숫자만 입력하세요'
                                type='number'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={PassCSS.contentTitle}><label>비고</label></td>
                        <td className={PassCSS.contentText} colspan="3">
                            <input
                                name='passEtc'
                                placeholder='비고'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                </tbody>
            </table>
        

        <div className={PassCSS.btnWrap}>
            <div>
            <button
                className={PassCSS.registBtn}
                onClick={ onClickPassRegistHandler }
            >
                등록하기
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

export default PassRegist;