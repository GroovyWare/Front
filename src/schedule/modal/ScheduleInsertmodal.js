import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css"
import { createSchedule } from "../../api/CalendarAPICalls";
import { initSchedule } from "../../modules/CalendarModule";


function ScheduleInsertModal({ schedule, setScheduleInsertModal }) {
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.scheduleReducer);

    useEffect(() => {
        if (regist?.status === 200 && setScheduleInsertModal) {
            setScheduleInsertModal(false);
            alert("일정 등록 완료");
            dispatch(initSchedule());    /// 초기화를 시켜주는 리듀서를 디스패치한다.
        }
    }, [regist, setScheduleInsertModal]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = () => {

        dispatch(createSchedule(form));

    };


    return (
        <div className={ScheduleInsertModalCSS.modal}>
            <div className={ScheduleInsertModalCSS.modalContainer}>
                <div className={ScheduleInsertModalCSS.insertingformDiv}>
                    <h1>일정생성</h1>
                    <select className={ScheduleInsertModalCSS.selects} name="schDiv" onChange={onChangeHandler}>
                        <option value="선택">선택</option>
                        <option value="부서">부서</option>
                        <option value="개인">개인</option>
                    </select>


                    <input className={ScheduleInsertModalCSS.titles}
                        type="text"
                        name="title"
                        placeholder="일정제목의 입력을 바랍니다!"
                        onChange={onChangeHandler}
                    />
                    <br />
                    <textarea className={ScheduleInsertModalCSS.textareas}
                        placeholder=" 일정내용을 입력해주시기 바랍니다."
                        name="context"
                        onChange={onChangeHandler}
                        
                    ></textarea>
                    <br/>
                    <label>시작일을 입력해주세요 : </label>
                    <input className={ScheduleInsertModalCSS.datearea}
                        placeholder="시작일 입력"
                        type="datetime-local"
                        name="start"
                        onChange={onChangeHandler}
                    />
                    <br />
                    <label>종료일을 입력해주세요 : </label>
                    <input className={ScheduleInsertModalCSS.datearea}
                        placeholder="종료일 입력"
                        type="datetime-local"
                        name="end"
                        onChange={onChangeHandler}
                    />
                    <br />
                    <label>이벤트 색상 입력</label>
                    <input
                        className={ScheduleInsertModalCSS.colorinputs}
                        type="color"
                        name="color"
                        placeholder="이벤트 색상입력"
                        onChange={onChangeHandler}

                    />
                    <label
                    >글색상입력</label>
                    <input
                        className={ScheduleInsertModalCSS.colorinputs}
                        type="color"
                        name="textColor"
                        placeholder="이벤트 글색상입력"
                        onChange={onChangeHandler}
                    />
                    <br />
                    <button onClick={handleSubmit} className={ScheduleInsertModalCSS.buttons}>
                        등록하기
                    </button>

                    <button
                       className={ScheduleInsertModalCSS.buttons}
                        onClick={() => setScheduleInsertModal(false)}
                    >
                        돌아가기
                    </button>
                </div>
            </div>


        </div>

    )

}


export default ScheduleInsertModal;