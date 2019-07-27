import { combineReducers } from "redux";
import notes from "./notesReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  notes,
  apiCallsInProgress
});

export default rootReducer;
