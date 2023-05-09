import {TaskStateType} from "../AppWithRedux";
import {
    AddTasklistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    taskReducer
} from "./task-reducers";
import {AddTodolistAC} from "./todolist-reducers";



test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id:  '1', isDone: false, taskTitle: 'Первая Таска'},
            {id:  '2', isDone: false, taskTitle: 'Вторая Таска'},
            {id:  '3', isDone: false, taskTitle: 'Третья Таска'}
        ],
        'todolistId2': [
            {id:  '1', isDone: true, taskTitle: 'JS'},
            {id:  '2', isDone: true, taskTitle: 'HTML'},
            {id:  '3', isDone: true, taskTitle: 'REACT'}
        ]
    }

    const action = RemoveTaskAC('2', 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id:  '1', isDone: false, taskTitle: 'Первая Таска'},
            {id:  '2', isDone: false, taskTitle: 'Вторая Таска'},
            {id:  '3', isDone: false, taskTitle: 'Третья Таска'}
        ],
        'todolistId2': [
            {id:  '1', isDone: true, taskTitle: 'JS'},
            {id:  '3', isDone: true, taskTitle: 'REACT'}
        ]
    })

    expect(endState['todolistId2'].length).toBe(2)

})
test('correct task should be added to correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id:  '1', isDone: false, taskTitle: 'Первая Таска'},
            {id:  '2', isDone: false, taskTitle: 'Вторая Таска'},
            {id:  '3', isDone: false, taskTitle: 'Третья Таска'}
        ],
        'todolistId2': [
            {id:  '1', isDone: true, taskTitle: 'JS'},
            {id:  '2', isDone: true, taskTitle: 'HTML'},
            {id:  '3', isDone: true, taskTitle: 'REACT'}
        ]
    }

    const action = AddTasklistAC('juce', 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].taskTitle).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id:  '1', isDone: false, taskTitle: 'Первая Таска'},
            {id:  '2', isDone: false, taskTitle: 'Вторая Таска'},
            {id:  '3', isDone: false, taskTitle: 'Третья Таска'}
        ],
        'todolistId2': [
            {id:  '1', isDone: true, taskTitle: 'JS'},
            {id:  '2', isDone: true, taskTitle: 'HTML'},
            {id:  '3', isDone: true, taskTitle: 'REACT'}
        ]
    }

    const action = ChangeTaskStatusAC('2', false, 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
})
test('task title should be changed', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id:  '1', isDone: false, taskTitle: 'Первая Таска'},
            {id:  '2', isDone: false, taskTitle: 'Вторая Таска'},
            {id:  '3', isDone: false, taskTitle: 'Третья Таска'}
        ],
        'todolistId2': [
            {id:  '1', isDone: true, taskTitle: 'JS'},
            {id:  '2', isDone: true, taskTitle: 'HTML'},
            {id:  '3', isDone: true, taskTitle: 'REACT'}
        ]
    }

    const action = ChangeTaskTitleAC('2', 'Новое Названия', 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].taskTitle).toBe('Новое Названия')
})
test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id:  '1', isDone: false, taskTitle: 'Первая Таска'},
            {id:  '2', isDone: false, taskTitle: 'Вторая Таска'},
            {id:  '3', isDone: false, taskTitle: 'Третья Таска'}
        ],
        'todolistId2': [
            {id:  '1', isDone: true, taskTitle: 'JS'},
            {id:  '2', isDone: true, taskTitle: 'HTML'},
            {id:  '3', isDone: true, taskTitle: 'REACT'}
        ]
    }

    const action = AddTodolistAC('new todolist')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})