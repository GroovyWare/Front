import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css"
import { createSchedule } from "../../api/CalendarAPICalls";


function ScheduleInsertModal({ schedule, setScheduleInsertModal }) {
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.scheduleReducer);

    useEffect(
        () => {
            if (regist?.status === 200) {
                setScheduleInsertModal(false);
                alert("일정 등록 완료");
            }
        }, [regist]
    )

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    console.log("form : ", form);
    const handleSubmit = () => {

        setScheduleInsertModal(false); 
        dispatch(createSchedule(form));
      };


    return (
        <div className={ScheduleInsertModalCSS.modal}>
            <div className={ScheduleInsertModalCSS.modalContainer}>
                <div className={ScheduleInsertModalCSS.insertingformDiv}>
                    <h1>일정생성</h1>
                    <select name="">
                        <option value={"전체"}>전체</option>
                        <option value={"부서"}>부서</option>
                        <option value={"개인"}>개인</option>
                    </select>
                 
                    <input
                        type="text"
                        name="title"
                        placeholder="일정제목의 입력을 바랍니다!"
                        onChange={onChangeHandler}
                    />
                    <textarea
                        placeholder="일정내용을 입력해주시기 바랍니다."
                        name="context"
                        onChange={onChangeHandler}
                    ></textarea>
                    <input
                        placeholder="시작일 입력"
                        type="datetime-local"   
                        name="start"
                        onChange={onChangeHandler}

                    />
                    <input
                       placeholder="종료일 입력"
                       type="datetime-local"   
                       name="end"
                       onChange={onChangeHandler} 
                    />
                    <label>이벤트 색상 입력</label>
                    <input
                        type="color"
                        name="color"
                        placeholder="이벤트 색상입력"
                        onChange={onChangeHandler} 

                    />
                    <label
                    >글색상입력</label>
                    <input
                        type="color"
                        name="textColor"
                        placeholder="이벤트 글색상입력"
                        onChange={onChangeHandler} 
                    />

<button onClick={handleSubmit}>
            등록하기
          </button>
                </div>
            </div>


        </div>

    )

}


export default ScheduleInsertModal;