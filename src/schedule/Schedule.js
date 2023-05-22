
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSchedules, searchingSchedule, updateSchedule } from "../api/CalendarAPICalls";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Schedule.module.css";
import ScheduleCss from "./Schedule.css";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ScheduleInsertModal from "./modal/ScheduleInsertmodal";
import ScheduleSearchModal from "./modal/ScheduleSearchModal";

const Schedule = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.scheduleReducer);
  const [filterType, setFilterType] = useState("전체");
  const navigate = useNavigate();
  const [scheduleInsertModal, setScheduleInsertModal] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchSchedule, setSearchSchedule] = useState("");
  const [scheduleSearchModal, setScheduleSearchModal] = useState(false);

  useEffect(() => {
    dispatch(AllSchedules());
  }, []);

  useEffect(() => {
    if (scheduleInsertModal == false) {
      dispatch(AllSchedules());
    }
  }, [scheduleInsertModal]);

  useEffect(() => {
    if (events?.data) {
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
  }, [events, filterType , scheduleInsertModal]);
  /* 필터링 */
  const handleFilterChange = (event) => {
    setFilterType(event.target.value); // 라디오 버튼 값 변경
  };
  /*  제목으로 검색하기 */
  const searchingTitleHandler = () => {
    setScheduleSearchModal(true);
  }
  



  /* 일정수정 */
  const handleEventDrop = (eventDropInfo) => {
    const { event } = eventDropInfo;
    const updatedEvent = {
      // ... updated event data ...
    };
    // update event API call
    dispatch(updateSchedule(event.id, updatedEvent));
  };

  
  /* 생성 */
  const onClickHandler = () => {
    setScheduleInsertModal(true);
  };









  /* 캘린더 옵션 일부 */
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
    // eventDrop: handleEventDrop,
  };

  return (
    <div className={styles.allview}>
      {scheduleInsertModal && (
        <ScheduleInsertModal setScheduleInsertModal={setScheduleInsertModal} />
      )}
      {scheduleSearchModal && ( 
        <ScheduleSearchModal setScheduleSearchModal={setScheduleSearchModal} searchSchedule={searchSchedule}/>
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

      <div>
        <label>제목으로 검색</label>
        <input type="text" name="title" value={searchSchedule} onChange={(e) => setSearchSchedule(e.target.value)}></input>
        <button onClick={searchingTitleHandler}>검색</button>
      </div>
    </div>
    
  );
};

export default Schedule;
