import { combineReducers } from "redux";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";

const rootReducer = combineReducers({
    approvalReducer,
    playReducer,
    memberReducer
});

export default rootReducer;