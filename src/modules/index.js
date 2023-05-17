import { combineReducers } from "redux";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import passReducer from "./PassModule";
import scheduleReducer from "./CalendarModule"

const rootReducer = combineReducers({
    approvalReducer,
    playReducer,
    memberReducer,
    passReducer
    scheduleReducer
});

export default rootReducer;