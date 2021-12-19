import { combineReducers } from "redux";
import {allUsersReducer,authUserReducer} from "./UserReducers"
import {questionsReducer} from "./questionsReducer"

// combine my reducers into one root reducer

export const reducers = combineReducers({
  allUsers: allUsersReducer,
  authUser: authUserReducer,
  questions: questionsReducer,
})



