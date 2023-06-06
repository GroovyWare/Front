import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailReadModifyAPI} from "../../api/MemberAPICalls";
import { callMemberAddPassAPI } from "../../api/MemberHistoryAPICalls"
import MemberModifyCSS from "./MemberModify.module.css";
import { toast } from "react-toastify";

function MemberAddPass() {

    const { memCode } = useParams();
    const info = useSelector(state => state.memberReducer);
    const { regist } = useSelector(state => state.historyReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[form, setForm] = useState({
        memCode : info.memCode,
        resStart : getToday()
    });


    /* 회원 상세정보 조회 */
    useEffect(
        () => {
            dispatch(callMemberDetailReadModifyAPI({ memCode }));   
        }, []);
    
    /* 회원 수정완료 후 이동 */
    useEffect(
        () => {
            if(regist?.status === 200) {
                toast('회원권 추가가 완료되었습니다.');
                navigate(`/member/detail/${memCode}`, { replace : true });
            }
        },
        [regist]
    );

    /* 날짜 구하기 */
    function addMonths(date, months) {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + months);
        return newDate;
      }
      
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    /* 입력 양식 값 변경될 때 */
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
      
        if (name === 'passCode') {
          let resEnd = form.resStart;
      
          switch (value) {
            case '1': // 3개월
              resEnd = addMonths(form.resStart, 3);
              break;
            case '2': // 6개월
              resEnd = addMonths(form.resStart, 6);
              break;
            case '3': // 12개월
              resEnd = addMonths(form.resStart, 12);
              break;
            case '4': // PT
            resEnd = addMonths(form.resStart, 3);
              break;
            default:
              break;
          }
      
          setForm({
            ...form,
            [name]: value,
            resEnd: formatDate(resEnd),
          });
        } else {
          setForm({
            ...form,
            [name]: value,
          });
        }
      };


    /* 회원 수정 저장 버튼 클릭 이벤트 */
    const onClickMemberUpdateHandler = () => {

        if (!form.resStart || !form.resEnd || !form.passCode || !form.empCode) {
            toast('모든 필드를 입력해주세요.');
            return;
        }

        if (form.passCode > 3 && !form.empCode) {
            toast('담당자를 입력해주세요');
            return;
        }

        /* 서버로 전달할 formData 형태의 객체 설정 */
        const formData = new FormData();    

        formData.append("memCode", form.memCode);
        formData.append("resStart", form.resStart);
        formData.append("resEnd", form.resEnd);
        formData.append("pass.passCode", form.passCode);
        formData.append("memEtc", form.memEtc);

        if (form.empCode) {
            formData.append("employee.empCode", form.empCode);
        }

        dispatch(callMemberAddPassAPI(formData));
    }

    /* 오늘 날짜 가져오기 */
    function getToday() {     
        const today = new Date();
        return today.getFullYear() + "-" + ((today.getMonth()+1)>9 ? (today.getMonth()+1) : "0"+(today.getMonth()+1)) + "-" + (today.getDate()>9 ? today.getDate() : "0"+today.getDate());
    }

    const inputStyleMemCode = { backgroundColor : 'rgb(145, 146, 155)'};

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
                                value={info.memCode}
                                style={ inputStyleMemCode }
                                
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>시작일</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input 
                                className={MemberModifyCSS.dateStyle}
                                type='date'
                                min={ getToday() }
                                name='resStart'
                                value={form.resStart}
                                onChange={ onChangeHandler }

                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>회원권</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <select
                                name='passCode'
                                onChange={ onChangeHandler }
                            >
                                <option>선택하세요</option>
                                <option value={1}>3개월</option>
                                <option value={2}>6개월</option>
                                <option value={3}>12개월</option>
                                <option value={4}>PT</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>종료일</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
                            <input
                                className={MemberModifyCSS.dateStyle}
                                type='date'
                                min={ getToday() }
                                name='resEnd'
                                value={form.resEnd}
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={MemberModifyCSS.contentTitle} colspan="3"><label>담당자</label></td>
                        <td className={MemberModifyCSS.contentText} colspan="3">
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
                </tbody>
            </table>
        
        <div>
            <button
                className={MemberModifyCSS.registBtnAddPass}
                onClick={ onClickMemberUpdateHandler }
            >
                등록
            </button>

            <button
                className={MemberModifyCSS.cancelBtn}
                onClick={ () => navigate(-1) }
            >
                취소
            </button>
        </div>
        </div>

        </>
    );
}

export default MemberAddPass;

