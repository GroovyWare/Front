import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css"
import { useDispatch, useSelector } from "react-redux";
import { createSchedule } from "../../api/CalendarAPICalls";
import { initSchedule } from "../../modules/CalendarModule";
import { useEffect, useState } from "react";


function VacationInsertModal({ schedule, setVacationInsertModal }) {
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const { regist } = useSelector(state => state.scheduleReducer);

    useEffect(() => {
        if (regist?.status === 200 && setVacationInsertModal) {
          setVacationInsertModal(false);
          alert("휴가 등록 완료");
          dispatch(initSchedule());    /// 초기화를 시켜주는 리듀서를 디스패치한다.
        }
      }, [regist, setVacationInsertModal]);

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
                    <h1>휴가생성</h1>
{/*                  
                    <input
                        type="text"
                        name="title"
                        placeholder="일정제목의 입력을 바랍니다!"
                        onChange={onChangeHandler}
                    /> */}


                    <select
                        name="title"
                        onChange={onChangeHandler}>
                        <option selected value="연차"></option>
                        <option value="경조"></option>
                        <option value="질병"></option>

                    </select>
                    {/* <textarea
                        placeholder="일정내용을 입력해주시기 바랍니다."
                        name="context"
                        onChange={onChangeHandler}
                    ></textarea> */}

                    <select
                    name="context"
                     onChange={onChangeHandler}>
                        <option selected value="연차중입니다."></option>
                        <option value="경조휴가중입니다."></option>
                        <option value="질병휴가중입니다."></option>
                    </select>
                    <input
                        type="date"
                        name="start"
                        onChange={onChangeHandler}
                    />
                    <input
                        type="date"
                        name="end"
                        onChange={onChangeHandler}
                    />
                    
                    <button onClick={handleSubmit}>
                        등록하기
                    </button>

                    <button
                        style={{
                            border: "none",
                            margin: 0,
                            fontSize: "10px",
                            height: "10px",
                        }}
                        onClick={() => setVacationInsertModal(false)}
                    >
                        돌아가기
                    </button>
                </div>
            </div>


        </div>

    )

}


export default VacationInsertModal;