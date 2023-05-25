
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSchedules, oneSchedule, searchingSchedule, updateSchedule } from "../api/CalendarAPICalls";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Schedule.module.css";
import ScheduleCss from "./Schedule.css";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ScheduleInsertModal from "./modal/ScheduleInsertmodal";
import ScheduleSearchModal from "./modal/ScheduleSearchModal";
import ScheduleUpdateModal from "./modal/ScheduleUpdateModal";


const Schedule = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.scheduleReducer);
  const [filterType, setFilterType] = useState("전체");
  const navigate = useNavigate();
  const [scheduleInsertModal, setScheduleInsertModal] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchSchedule, setSearchSchedule] = useState("");
  const [scheduleSearchModal, setScheduleSearchModal] = useState(false);
  const [scheduleUpdateModal, setScheduleUpdateModal] = useState(false);
  const [schCode, setschCode] = useState(0);
  const [justSchedule, setJustSchedule] = useState({});
  const [form, setForm] = useState([]);
  const { modify } = useSelector((state) => state.scheduleReducer);
  const [id, setId] = useState({})

  useEffect(() => {
    dispatch(AllSchedules());
  }, []);


  useEffect(() => {
    if (scheduleInsertModal == false) {
      dispatch(AllSchedules());
    }
  }, [scheduleInsertModal]);

  useEffect(() => {
    if (searchSchedule.id) {
      dispatch(oneSchedule(id));
    }
  }, [])

  useEffect(() => {
    if (scheduleUpdateModal == false) {
      dispatch(AllSchedules());
    }
  }, [scheduleUpdateModal])

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
  }, [events, filterType, scheduleInsertModal]);
  /* 필터링 */
  const handleFilterChange = (event) => {
    setFilterType(event.target.value); // 라디오 버튼 값 변경
  };
  /*  제목으로 검색하기 */
  const searchingTitleHandler = () => {
    setScheduleSearchModal(true);
  }


  /* 수정 페이지 진입 */
  // const selectedSchedule = (schedule) => {
  //   setJustSchedule(schedule);
  //   setScheduleUpdateModal(true);
  // }


  /* 생성 */
  const onClickHandler = () => {
    setScheduleInsertModal(true);
  };

  const onEventClickHandler = (info) => {

    console.log(info)
    console.log(info.event.id)
    console.log(events.data);


    const clickedEvent = events.data.find(event => event.id == info.event.id); // 값이 안나와서 비교연산자를 사용해보았다.
    console.log(clickedEvent);
    setJustSchedule(clickedEvent);
    setScheduleUpdateModal(true);
    // const clickedEvent = events.find(info.event.id);
    // setJustSchedule(clickedEvent);   // id 를 얻어온다. find 기준으로 잡고 찾는다. => set justschedule로 넣어줌
  }

  const DragHandler = (event) => {
    const { id, start, end } = event.event;
    const updatedEvent = {
      id,
      start,
      end,
      dragEvent: true,
    };
    console.log(event)
    console.log(event.event)

    console.log(updatedEvent);
    dispatch(updateSchedule(updatedEvent));



  }


  /* 캘린더 옵션 일부 */
  const calendarOptions = {

    plugins: [dayGridPlugin, interactionPlugin],
    titleFormat: (date) => {
      const year = `${date.date.year} 년`;
      const month = `${date.date.month + 1}월`;
      return ` ${year} ${month}`;
    },

    selectable: true,
    droppable: true,
    navLinks: true,
    eventLimit: true,
    eventDuationeditable: true,
    themeSystem: 'standard',
    headerToolbar: {
      left: "prevYear,prev,next,nextYear today",
      center: "title",
      right: "dayGridMonth,dayGridWeek,dayGridDay",
      locale: "ko"
    },

    events: filteredEvents,

  };

  return (
    <div>
      <div className={styles.searching}>
        <label>제목으로 검색</label>
        <input type="text" name="title" value={searchSchedule} onChange={(e) => setSearchSchedule(e.target.value)}></input>
        <button onClick={searchingTitleHandler}>검색</button>
      </div>

      <div className={styles.radioOptions}>
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


        <button className={styles.inserting} onClick={onClickHandler}>
          일정 생성
        </button>

      </div>

      <div className={styles.allview}>
        {scheduleInsertModal && (
          <ScheduleInsertModal setScheduleInsertModal={setScheduleInsertModal} />
        )}
        {scheduleSearchModal && (
          <ScheduleSearchModal setScheduleSearchModal={setScheduleSearchModal}
            searchSchedule={searchSchedule}
            setScheduleUpdateModal={setScheduleUpdateModal}
            setJustSchedule={setJustSchedule} />
        )}
        {scheduleUpdateModal && (
          <ScheduleUpdateModal setScheduleUpdateModal={setScheduleUpdateModal}
            justSchedule={justSchedule} />
        )}
      </div>
      <div className="calendarMain" style={{ maxWidth: '1680px', minWidth: '1100px' }}>
        <FullCalendar
          {...calendarOptions}
          locale={"ko-KR"}
          weekends={true}
          dayMaxEventRows={3}
          contentHeight={600}
          contentWidth={1600}
          eventClick={onEventClickHandler}
          eventDrop={DragHandler}
        />
      </div>








    </div>
  );
};

export default Schedule;