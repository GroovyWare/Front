
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSchedules } from "../api/CalendarAPICalls";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Schedule.module.css";

const Schedule = () => {
  const dispatch = useDispatch();
  /* 셀렉터로 전달받은 이벤트를 뽑아온다. */
  const { events } = useSelector((state) => state.scheduleReducer);
  const [filterType, setFilterType] = useState("전체")


  useEffect(() => {
    dispatch(AllSchedules());
  }, []);


  const handleFilterChange = (event) => {
    setFilterType(event.target.value); // 라디오 버튼 값 변경
  };


  const filteredEvents = events.data ? events.data.filter((event) => {
    if (filterType === "전체") {
      return true; // 전체 선택 시 모든 일정 반환
    } else if (filterType === "부서") {
      return event.schDiv === "부서"; // 부서 선택 시 부서 일정만 반환
    } else if (filterType === "개인") {
      return event.schDiv !== "부서" && event.schDiv !== "전체";
    }
    return false;
  }) : [];
  
  
  
  return (<div className={styles.allview}>
    <div className={styles.mainContents} style={{ maxWidth: '1680px', }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        titleFormat={(date) => {
          const year = `${date.date.year} 년`;
          const month = `${date.date.month + 1}월`;
          return ` ${year} ${month}`;
        }}
        editable={true}
        selectable={true}
        droppable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        dayHeaderContent={(args) => {
          const day = args.date.getDay();
          const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
            args.date
          );
          const classNames = [styles.fcday];
          if (day === 0) {
            classNames.push(styles.sunday);
          } else if (day === 6) {
            classNames.push(styles.saturday);
          }
          return <span className={classNames.join(" ")}>{weekday}</span>;
        }}
        dayHeaderClassNames={styles.fcday}

        /* 이벤트에 있는 데이터를 가져온다. */
        events={events.data}
        eventClassNames={styles.eventStyle}
      />
    </div>
      
    <div className={ styles.inserting}>일정 생성</div>
    <div>
        <label>
          <input
            type="radio"
            value="전체"
            checked={filterType === "전체"}
            onChange={handleFilterChange}
          />
          전체일정
        </label>
        <label>
          <input
            type="radio"
            value="부서"
            checked={filterType === "부서"}
            onChange={handleFilterChange}
          />
          부서일정
        </label>
        <label>
          <input
            type="radio"
            value="개인"
            checked={filterType === "개인"}
            onChange={handleFilterChange}
          />
          개인일정
        </label>
      </div>
      












    </div>
  );
};

export default Schedule;
