import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducers";


type RemoveTaskActionType = {
    type: 'RemoveTask',
    todolistId: string,
    taskId: string
}
type AddTaskActionType = {
    type: 'AddTask',
    todolistId: string,
    titleTask: string
}
type ChangeTaskStatusActionType = {
    type: 'Change Task Status',
    todolistId: string,
    taskId: string
    taskStatus: boolean
}
type ChangeTaskTitleActionType = {
    type: 'ChangeTaskTitle',
    todolistId: string,
    taskId: string
    taskTitle: string
}


type actionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const taskReducer = (state: TaskStateType, action: actionsType): TaskStateType => {

    switch (action.type) {

        case 'RemoveTask': {
            let copyState = {...state}
            copyState[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId)

            return copyState
        }

        case 'AddTask': {
            let copyState = {...state}
            let newTask = {
                id: v1(),
                isDone: false,
                taskTitle: action.titleTask
            }
            copyState[action.todolistId] = [newTask, ...copyState[action.todolistId]]
            return copyState
        }
        case 'Change Task Status': {
            let copyState = {...state}
            let task = copyState[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.taskStatus
            }
            return {...copyState}
        }
        case 'ChangeTaskTitle': {
            let copyState = {...state}
            let task = copyState[action.todolistId].find(t=>t.id === action.taskId)
            if(task){
                task.taskTitle = action.taskTitle
            }

            return copyState
        }
        case  "AddTodolist": {
            let copyState = {...state}
            copyState[action.id] = []
            return copyState
        }
        case  "RemoveTodolist":{
            let copyState = {...state}
           delete  copyState[action.tolistId]
            return copyState
        }

        default:
            return state
    }

}

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'RemoveTask',
        todolistId: todolistId,
        taskId: taskId
    }
}
export const AddTasklistAC = (titleTask: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'AddTask',
        todolistId: todolistId,
        titleTask: titleTask
    }
}
export const ChangeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'Change Task Status',
        todolistId: todolistId,
        taskId: taskId,
        taskStatus: taskStatus
    }
}
export const ChangeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'ChangeTaskTitle',
        todolistId: todolistId,
        taskId: taskId,
        taskTitle: taskTitle
    }
}
