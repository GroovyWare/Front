import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPassRegistAPI } from "../../api/PassAPICalls";



function PassRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { regist } = useSelector(state => state.PassReducer);
    const [form, setForm] = useState({});


    /* 회원권 등록 후 회원권 리스트로 이동 */
    useEffect(
        () => {
            if(regist?.status === 200){
                alert('회원권 등록이 완료되었습니다.')
                navigate('/pass', { replace : true });
            }
        },
        [regist]
    );

    /* 입력 양식 값이 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 회원권 등록 버튼 이벤트 */
    const onClickPassRegistHandler = () => {

        /* 서버로 전달할 formData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("passType");
        formData.append("passEtc");
        formData.append("passPrice");
        formData.append("passAmount");

        dispatch(callPassRegistAPI(formData));
    }


    return(
        <>
        <div>회원권 등록</div>
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
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>전화번호</label></td>
                        <td>
                            <input
                                name='memPhone'
                                placeholder='전화번호'
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td><label>회원권</label></td>
                        <td>
                            <select
                                name='passType'
                                onChange={ onChangeHandler }
                            >
                                <option value="1">3개월</option>
                                <option value="2">6개월</option>
                                <option value="3">12개월</option>
                                <option value="4">PT</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td><label>시작일</label></td>
                        <td>
                            <input 
                                type='date'
                                name='memStartDate'
                                placeholder='시작일'
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
                                placeholder='종료일'
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
                                placeholder='삭제일'
                                onChange={ onChangeHandler }
                            />
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
                onClick={ onClickPassRegistHandler }
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

export default PassRegist;