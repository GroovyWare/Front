import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleUpdateModalCSS from "./ScheduleUpdateModal.module.css";
import { updateSchedule } from "../../api/CalendarAPICalls";
import { initSchedule } from "../../modules/CalendarModule";
import { toast } from "react-toastify";



function ScheduleUpdateModal({ searchSchedule, setScheduleUpdateModal }) {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { modify } = useSelector((state) => state.scheduleReducer);
  

  useEffect(() => {
    if (modify?.status === 200 && setScheduleUpdateModal) {
      setScheduleUpdateModal(false);
      toast.warning("일정 수정 완료");
      dispatch(initSchedule());
    }
  }, [modify, setScheduleUpdateModal]);

  const onClickHandler = (schCode) => {
    setForm(
      searchSchedule.find((searchvalue) => searchvalue.schCode === schCode)
    );
  };

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(updateSchedule(form));
  };
  return (
    <div className={ScheduleUpdateModalCSS.modal}>
      <div className={ScheduleUpdateModalCSS.modalContainer}>
        <div className={ScheduleUpdateModalCSS.updatingformDiv}>
          <h1>일정 수정</h1>
          <select name="schDiv" onChange={onChangeHandler}>
            <option value="전체">전체</option>
            <option value="부서">부서</option>
            <option value="개인">개인</option>
          </select>
          <input
            type="text"
            name="title"
            placeholder="일정 제목을 입력해주세요!"
            onChange={onChangeHandler}
          />
          <textarea
            placeholder="일정 내용을 입력해주세요."
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
            placeholder="이벤트 색상을 입력해주세요."
            onChange={onChangeHandler}
          />
          <label>글 색상 입력</label>
          <input
            type="color"
            name="textColor"
            placeholder="글 색상을 입력해주세요."
            onChange={onChangeHandler}
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

export default ScheduleUpdateModal;
