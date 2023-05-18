
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AllSchedules, updateSchedule } from "../api/CalendarAPICalls";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import styles from "./Schedule.module.css";
// import ScheduleCss from "./Schedule.css";
// import { Navigate, useNavigate } from "react-router-dom";
// // import ScheduleUpdateModal from "./modal/ScheduleUpdateModal";
// import ScheduleInsertModal from "./modal/ScheduleInsertmodal";

// const Schedule = () => {
//   const dispatch = useDispatch();
//   /* 셀렉터로 전달받은 이벤트를 뽑아온다. */
//   const { events } = useSelector((state) => state.scheduleReducer);
//   const [filterType, setFilterType] = useState("전체")
//   const navigate = useNavigate();
//   const [scheduleInsertModal, setScheduleInsertModal] = useState(false);


//   useEffect(() => {
//     dispatch(AllSchedules());
//   }, []);

//   useEffect(() => {
//     if (scheduleInsertModal) {
//       dispatch(AllSchedules());
//     }
//   }, [dispatch, scheduleInsertModal]);
  

//   const handleFilterChange = (event) => {
//     setFilterType(event.target.value); // 라디오 버튼 값 변경
//   };


//   useEffect(() => {
//     if(filterType === "전체"){
//       dispatch(AllSchedules());
//     } else if(filterType === "부서"){
//       dispatch()
//     }
//   })

//   /* use effect 로 필터타입을 지정해서 그 때마다 불러와야 한다. */
//   const filteredEvents = events.data ? events.data.filter((event) => {
//     if (filterType === "전체") {
//       return true; // 전체 선택 시 모든 일정 반환
//     } else if (filterType === "부서") {
//       return event.schDiv === "부서"; // 부서 선택 시 부서 일정만 반환
//     } else if (filterType === "개인") {
//       return event.schDiv !== "부서" && event.schDiv !== "전체";
//     }
//     return false;
//   }) : [];

//   const handleEventDrop = (eventDropInfo) => {
//     const { event } = eventDropInfo;
//     const updatedEvent = {
      
//     }
    
//   };
  
//   const onClickHandler = () => {
//     setScheduleInsertModal(true);
//   };

//   const calendarOptions = {
//     height: 950, 
//     plugins: [dayGridPlugin, interactionPlugin],
//     titleFormat: (date) => {
//       const year = `${date.date.year} 년`;
//       const month = `${date.date.month + 1}월`;
//       return ` ${year} ${month}`;
//     },
//     editable: true,
//     selectable: true,
//     droppable: true,
//     navLinks: true,
//     eventLimit: true,
//     themeSystem: 'standard',
//     headerToolbar: {
//       left: "prevYear,prev,next,nextYear today",
//       center: "title",
//       right: "dayGridMonth,dayGridWeek,dayGridDay",
//       locale: "ko"

//     },
    
//     dayHeaderContent: (args) => {
//       const day = args.date.getDay();
//       const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
//         args.date
//       );
//       const classNames = [styles.fcday];
//       if (day === 0) {
//         classNames.push(styles.sunday);
//       } else if (day === 6) {
//         classNames.push(styles.saturday);
//       }
//       return <span className={classNames.join(" ")}>{weekday}</span>;
//     },

//     events: events.data,
//     eventDrop: handleEventDrop,
//   };
// // <div className={`${styles.mainContents} my-fullcalendar`} style={{ maxWidth: '1680px' }}>
//   return (
//     <div className={styles.allview}>
//     {scheduleInsertModal && (
//       <ScheduleInsertModal setScheduleInsertModal={setScheduleInsertModal} />
//     )}
//     <div className={`${styles.mainContents} ScheduleCSS`} style={{ maxWidth: '1680px' }}>
//       <FullCalendar
//         {...calendarOptions}
//         locale={"ko-KR"}
//         weekends={true}
//         dayMaxEventRows={3}
//         eventBackgroundColor="white"
//         contentHeight={100}
//       />
//     </div>
      
//     <button className={styles.inserting} onClick={onClickHandler}>
//       일정 생성
//     </button>
//     <div>
//         <label>
//           <input
//             type="radio"
//             value="전체"
//             checked={filterType === "전체"}
//             onChange={handleFilterChange}
//           />
//           전체일정
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="부서"
//             checked={filterType === "부서"}
//             onChange={handleFilterChange}
//           />
//           부서일정
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="개인"
//             checked={filterType === "개인"}
//             onChange={handleFilterChange}
//           />
//           개인일정
//         </label>
//       </div>
      




//     </div>
//   );
// };

// export default Schedule;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSchedules, updateSchedule } from "../api/CalendarAPICalls";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Schedule.module.css";
import ScheduleCss from "./Schedule.css";
import { Navigate, useNavigate } from "react-router-dom";
import ScheduleInsertModal from "./modal/ScheduleInsertmodal";

const Schedule = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.scheduleReducer);
  const [filterType, setFilterType] = useState("전체");
  const navigate = useNavigate();
  const [scheduleInsertModal, setScheduleInsertModal] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    dispatch(AllSchedules());
  }, []);

  useEffect(() => {
    if (scheduleInsertModal) {
      dispatch(AllSchedules());
    }
  }, [dispatch, scheduleInsertModal]);

  useEffect(() => {
    if (events.data) {
      const filtered = events.data.filter((event) => {
        if (filterType === "전체") {
          return true; // 전체 선택 시 모든 일정 반환
        } else if (filterType === "부서") {
          return event.schDiv === "부서"; // 부서 선택 시 부서 일정만 반환
        } else if (filterType === "개인") {
          return event.schDiv !== "부서" && event.schDiv !== "전체";
        }
        return false;
      });
      setFilteredEvents(filtered);
    }
  }, [events.data, filterType]);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value); // 라디오 버튼 값 변경
  };


  /* 일정수정 */
  const handleEventDrop = (eventDropInfo) => {
    const { event } = eventDropInfo;
    const updatedEvent = {
      // ... updated event data ...
    };
    // update event API call
    dispatch(updateSchedule(event.id, updatedEvent));
  };

  const onClickHandler = () => {
    setScheduleInsertModal(true);
  };

  const calendarOptions = {
    height: 950, 
    plugins: [dayGridPlugin, interactionPlugin],
    titleFormat: (date) => {
      const year = `${date.date.year} 년`;
      const month = `${date.date.month + 1}월`;
      return ` ${year} ${month}`;
    },
    editable: true,
    selectable: true,
    droppable: true,
    navLinks: true,
    eventLimit: true,
    themeSystem: 'standard',
    headerToolbar: {
      left: "prevYear,prev,next,nextYear today",
      center: "title",
      right: "dayGridMonth,dayGridWeek,dayGridDay",
      locale: "ko"},

    events: filteredEvents, 
    eventDrop: handleEventDrop,
  };

  return (
    <div className={styles.allview}>
      {scheduleInsertModal && (
        <ScheduleInsertModal setScheduleInsertModal={setScheduleInsertModal} />
      )}
      <div className={`${styles.mainContents} ScheduleCSS`} style={{ maxWidth: '1680px' }}>
        <FullCalendar
          {...calendarOptions}
          locale={"ko-KR"}
          weekends={true}
          dayMaxEventRows={3}
          eventBackgroundColor="white"
          contentHeight={100}
        />
      </div>
      
      <button className={styles.inserting} onClick={onClickHandler}>
        일정 생성
      </button>
      
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
