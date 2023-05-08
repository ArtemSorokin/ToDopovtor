import {FilterValueTypes, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'RemoveTodolist',
    tolistId:string,
}
export type AddTodolistActionType = {
    type: 'AddTodolist',
    title: string
    id:string
}
type ChangeTodoListTitleActionType = {
    type: 'Change TodoList Title',
    tolistId:string,
    title: string
}
type ChangeFilterTodoListActionType = {
    type: 'ChangeFilter TodoList',
    tolistId:string,
    filter: FilterValueTypes
}
type actionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodoListTitleActionType | ChangeFilterTodoListActionType

export const todolistReducer = (state:Array<TodolistType>, action: actionsType): Array<TodolistType> => {

    switch (action.type) {

        case 'RemoveTodolist': {
                    return state.filter( tl=> tl.id !== action.tolistId)
        }
        case 'AddTodolist': {

            let newTodolist:TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'All'
            }
            return [...state, newTodolist]
        }
        case 'Change TodoList Title': {
            let TodoTitleForChange = state.find(tl=> tl.id === action.tolistId)
            if(TodoTitleForChange) {
                TodoTitleForChange.title = action.title
            }

            return [ ...state ]
        }
        case 'ChangeFilter TodoList': {
            let TodoTitleForChange = state.find(tl=> tl.id === action.tolistId)
            if(TodoTitleForChange) {
                TodoTitleForChange.filter = action.filter
            }
            return [...state ]
        }
        default: return state
    }

}

export const RemoveTodolistActionAC = (id:string):RemoveTodolistActionType=>{
    return {
        type: 'RemoveTodolist',
        tolistId: id,
    }
}
export const AddTodolistAC = (title:string):AddTodolistActionType =>{
    return {
        type:"AddTodolist",
        title: title,
        id: v1()
    }
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType=>{
    return {
        type:'Change TodoList Title',
        tolistId: id,
        title:title
    }
}
export const ChangeFilterTodoListAC = (id:string, filter: FilterValueTypes): ChangeFilterTodoListActionType=>{
    return {
        type:'ChangeFilter TodoList',
        tolistId:id ,
        filter: filter
    }
}