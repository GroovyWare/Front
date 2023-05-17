import { combineReducers } from "redux";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import scheduleReducer from "./CalendarModule"

const rootReducer = combineReducers({
    approvalReducer,
    playReducer,
    memberReducer,
    scheduleReducer
});

export default rootReducer;