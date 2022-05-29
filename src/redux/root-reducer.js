import { combineReducers } from "redux";
import { taskReducer } from "./Tasks/Task-reducer";
import { userReducer } from "./User/UserReducer";

const rootReducer = combineReducers({
  taskReducer: taskReducer,
  user: userReducer,
});
export default rootReducer;
