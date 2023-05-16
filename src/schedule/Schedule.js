import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSchedules } from "../api/CalendarAPICalls";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Schedule.module.css";

const Schedule = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events); // 상태 관리 라이브러리로부터 이벤트 데이터 가져오기

  useEffect(() => {
    dispatch(AllSchedules()); // 이벤트 데이터 가져오기
  }, [dispatch]);


  return (
    <div className={styles.mainContents}>
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
          right: "dayGridMonth,dayGridWeek"
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
        events={events}
        eventClassNames={styles.eventStyle}
      />

    </div>
  );
};

export default Schedule;
