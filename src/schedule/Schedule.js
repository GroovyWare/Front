import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Schedule.module.css";
import { useState } from "react";

const Schedule = () => {

  const [ eventConstructor, setEventConstructor ] = useState(false);
  const [ selectedEvent, setSelectedEvent] = useState({});

  const clickEventHandler = (info) => {
    setSelectedEvent(info.event);
    setEventConstructor(true);
  }

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
        events={[
          { title: "event 1", start: "2023-05-01" },
          { title: "event 2", start: "2023-05-05", end: "2023-05-07" },
          { title: "event 5", start: "2023-05-09T12:30:00" , end: "2023-05-10T16:30:05", allDay: false },
        ]}
        eventClassNames={styles.eventStyle}
      />

    </div>
  );
};

export default Schedule;
