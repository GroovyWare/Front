import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css"


function ScheduleInsertModal({ writer, setScheduleInsertModal }) {
    const [form, setForm] = useState({ product: { productCode } });
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


    return (
        <div className={ScheduleInsertModalCSS.modal}>
            <div className={ScheduleInsertModalCSS.modalContainer}>
                <div className={ScheduleInsertModalCSS.insertingformDiv}>
                    <h1>일정생성</h1>
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
                        type=""   
                    />

                </div>
            </div>


        </div>

    )

}