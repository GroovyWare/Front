import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css";

export function ScheduleUpdateModal({ writer, setScheduleInsertModal }) {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { put } = useSelector((state) => state.scheduleReducer);

  useEffect(() => {
    // 조회한 내용을 바탕으로 필드의 초기값 설정
    if (writer) {
      setForm({
        title: writer.Title,
        context: writer.context,
        start: writer.start,
        end: writer.end,
        color: writer.color,
        textColor: writer.textColor,
      });
    }
  }, [put]);

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
          <h1>일정수정</h1>
          <input
            type="text"
            name="title"
            placeholder="일정제목의 입력을 바랍니다!"
            onChange={onChangeHandler}
            value={form.title || ""}
          />
          <textarea
            placeholder="일정내용을 입력해주시기 바랍니다."
            name="context"
            onChange={onChangeHandler}
            value={form.context || ""}
          ></textarea>
          <input
            type="datetime-local"
            name="start"
            placeholder="시작하는 시간을 지정하세요"
            value={form.start || ""}
          />
          <input
            type="datetime-local"
            name="end"
            placeholder="끝나는 시간을 지정하세요"
            value={form.end || ""}
          />
          <label>스케줄 색상지정</label>
          <input type="color" name="color" value={form.color || ""} />
          <label>스케줄 글색상지정</label>
          <input type="color" name="textColor" value={form.textColor || ""} />

          <div>
            <button onClick={handleConfirm}>확인</button>
            <button
                        style={{
                            border: "none",
                            margin: 0,
                            fontSize: "10px",
                            height: "10px",
                        }}
                        onClick={() => setScheduleInsertModal(false)}
                    >
                        돌아가기
                    </button>
          </div>
        </div>
      </div>
    </div>
  );
}
