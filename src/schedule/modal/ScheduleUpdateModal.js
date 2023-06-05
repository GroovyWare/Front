import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleUpdateModalCSS from "./ScheduleUpdateModal.module.css";
import { updateSchedule, deleteOne } from "../../api/CalendarAPICalls";
import { initSchedule } from "../../modules/CalendarModule";
import { toast } from "react-toastify";



function ScheduleUpdateModal({  setScheduleUpdateModal , justSchedule}) {
  const [form, setForm] = useState(justSchedule);
 
 
  const dispatch = useDispatch();
  const { modify } = useSelector((state) => state.scheduleReducer);
  const { deleteStatus } = useSelector((state) => state.scheduleReducer);
  
  console.log(form)

  useEffect(() => {
    if (modify?.status === 200 && setScheduleUpdateModal) {
  
      setScheduleUpdateModal(false);
      toast.warning("일정 수정 완료");
      dispatch(initSchedule());
    }
  }, [modify, setScheduleUpdateModal]);

  useEffect(() => {
    if(deleteStatus?.status === 200 && setScheduleUpdateModal) {
      setScheduleUpdateModal(false);
      toast.warning("일정 삭제 완료")
      dispatch(initSchedule());
    }
  }, [deleteStatus, setScheduleUpdateModal])

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

  const deleteOneSchedule = () => {
    dispatch(deleteOne(form));
    
  }
 
  return (
    <div className={ScheduleUpdateModalCSS.modal}>
      <div className={ScheduleUpdateModalCSS.modalContainer}>
        <div className={ScheduleUpdateModalCSS.updatingformDiv}>
          <h1>상세 일정</h1>
          <select name="schDiv"
           className={ScheduleUpdateModalCSS.selects}
          onChange={onChangeHandler}>
            <option value="선택">선택</option>
            <option value="부서">부서</option>
            <option value="개인">개인</option>
          </select>
          <input
          className={ScheduleUpdateModalCSS.titles}
            type="text"
            name="title"
            placeholder="일정 제목을 입력해주세요!"
            onChange={onChangeHandler}
            value={form.title}
          />
          <br/>
          <textarea
            className={ScheduleUpdateModalCSS.textareas}
            placeholder="일정 내용을 입력해주세요."
            name="context"
            onChange={onChangeHandler}
            value={form.context}
          ></textarea>
          <br/>
          <label> 시작일 : </label>
          <input
          className={ScheduleUpdateModalCSS.datearea}
            placeholder="시작일"
            type="datetime-local"
            name="start"
            onChange={onChangeHandler}
            value={form.start.toISOString}
          />
          <br/>
          {/* isostring으로 반환값을 맞춰준다. */}
          <label> 종료일 : </label>
          <input
          className={ScheduleUpdateModalCSS.datearea}
            placeholder="종료일"
            type="datetime-local"
            name="end"
            onChange={onChangeHandler}
            value={form.end.toISOString}
          />
          <br/>
          <label>이벤트 색상</label>
          <input
            type="color"
            name="color"
            placeholder="이벤트 색상을 입력해주세요."
            onChange={onChangeHandler}
            value={form.color}
          />
          <br/>
          <label>글 색상</label>
          <input
            type="color"
            name="textColor"
            placeholder="글 색상을 입력해주세요."
            onChange={onChangeHandler}
            value={form.textColor}
          />
          <br/>
          <button 
          className={ScheduleUpdateModalCSS.buttons}
          onClick={handleSubmit}>수정하기</button>

          <button onClick={deleteOneSchedule}
          className={ScheduleUpdateModalCSS.buttons}>삭제하기</button>
          <button
           className={ScheduleUpdateModalCSS.buttons}
            onClick={() => setScheduleUpdateModal(false)}
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleUpdateModal;