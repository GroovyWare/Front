import { combineReducers } from "redux";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import passReducer from "./PassModule";
import historyReducer from "./HistoryModule";

const rootReducer = combineReducers({
    approvalReducer,
    playReducer,
    memberReducer,
    passReducer,
    historyReducer
});

export default rootReducer;