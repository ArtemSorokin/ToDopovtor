import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../todolist-reducers";
import {taskReducer} from "../task-reducers";




const rootReducer = combineReducers({
    todolistREDUCER: todolistReducer,
    taskREDUCER: taskReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>



export const store = createStore(rootReducer)