import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css";

function ScheduleUpdateModal({  setScheduleUpdateModal , justSchedule}) {
  const [form, setForm] = useState(justSchedule);
 
 
  const dispatch = useDispatch();
  const { modify } = useSelector((state) => state.scheduleReducer);
  
  console.log(form)

  useEffect(() => {
    if (modify?.status === 200 && setScheduleUpdateModal) {
  
      setScheduleUpdateModal(false);
      toast.warning("일정 수정 완료");
      dispatch(initSchedule());
    }
  }, [modify, setScheduleUpdateModal]);

  const handleSubmit = () => {
    dispatch(updateSchedule(form));
  };
  

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log("form : ", form);

 
  return (
    <div className={ScheduleUpdateModalCSS.modal}>
      <div className={ScheduleUpdateModalCSS.modalContainer}>
        <div className={ScheduleUpdateModalCSS.updatingformDiv}>
          <h1>일정 수정</h1>
          <select name="schDiv" onChange={onChangeHandler}>
            <option value="선택">선택</option>
            <option value="부서">부서</option>
            <option value="개인">개인</option>
          </select>
          <input
            type="text"
            name="title"
            placeholder="일정제목의 입력을 바랍니다!"
            onChange={onChangeHandler}
            value={form.title}
          />
          <textarea
            placeholder="일정내용을 입력해주시기 바랍니다."
            name="context"
            onChange={onChangeHandler}
            value={form.context}
          ></textarea>
          <input
            type="datetime-local"
            name="start"
            onChange={onChangeHandler}
            value={form.start}
          />
          <input
            type="datetime-local"
            name="end"
            onChange={onChangeHandler}
            value={form.end}
          />
          <label>이벤트 색상 입력</label>
          <input
            type="color"
            name="color"
            placeholder="이벤트 색상을 입력해주세요."
            onChange={onChangeHandler}
            value={form.color}
          />
          <label>글 색상 입력</label>
          <input
            type="color"
            name="textColor"
            placeholder="글 색상을 입력해주세요."
            onChange={onChangeHandler}
            value={form.textColor}
          />
          <button onClick={handleSubmit}>수정하기</button>
          <button
            style={{
              border: "none",
              margin: 0,
              fontSize: "10px",
              height: "10px",
            }}
            onClick={() => setScheduleUpdateModal(false)}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
