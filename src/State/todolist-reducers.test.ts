import {v1} from "uuid";
import {FilterValueTypes, TodolistType} from "../App";
import {
    AddTodolistAC,
    ChangeFilterTodoListAC,
    ChangeTodoListTitleAC,
    RemoveTodolistActionAC,
    todolistReducer
} from "./todolist-reducers";


test('Correct Todo list Should be removed',()=>{

    let tolistId1 = v1()
    let tolistId2 = v1()

    let startState: Array<TodolistType> = [{id: tolistId1, title: 'What to learn', filter: 'ACTIVE'},
            {id: tolistId2, title: 'What to Byu', filter: 'COMPLETED'}]


          const endState = todolistReducer(startState, RemoveTodolistActionAC(tolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(tolistId2)

} )
test('Add Todo list',()=>{

    let tolistId1 = v1()
    let tolistId2 = v1()

    let newTodolist = 'New TodoList'

    let startState: Array<TodolistType> = [{id: tolistId1, title: 'What to learn', filter: 'ACTIVE'},
        {id: tolistId2, title: 'What to Byu', filter: 'COMPLETED'}]


    const endState = todolistReducer(startState, AddTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolist)
    expect(endState[2].filter).toBe('All')

} )
test('Change Todo list Title',()=>{

    let tolistId1 = v1()
    let tolistId2 = v1()
    let newTodolistTitle = 'New TodoList'
    let startState: Array<TodolistType> = [{id: tolistId1, title: 'What to learn', filter: 'ACTIVE'},
        {id: tolistId2, title: 'What to Byu', filter: 'COMPLETED'}]


    const endState = todolistReducer(startState, ChangeTodoListTitleAC(tolistId2, newTodolistTitle))


    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[0].title).toBe('What to learn')

} )
test('Correct Todo list Filter Should Changed',()=>{

    let tolistId1 = v1()
    let tolistId2 = v1()
    let newTodolistFilter: FilterValueTypes = 'ACTIVE'
    let startState: Array<TodolistType> = [{id: tolistId1, title: 'What to learn', filter: 'All'},
        {id: tolistId2, title: 'What to Byu', filter: 'All'}]


    const endState = todolistReducer(startState, ChangeFilterTodoListAC(tolistId2, newTodolistFilter))


    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newTodolistFilter)
    expect(endState[0].filter).toBe('All')

} )
