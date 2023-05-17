import { combineReducers } from "redux";
import approvalReducer from "./ApprovalModule";
import playReducer from "./PlayModule";
import memberReducer from "./MemberModule";
import passReducer from "./PassModule";

const rootReducer = combineReducers({
    approvalReducer,
    playReducer,
    memberReducer,
    passReducer
});

export default rootReducer;