import React, {
    ChangeEvent,
    FC,
    KeyboardEvent,
    MouseEvent,
    useState
} from "react";
import {FilterValueTypes} from "./App";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filteringTask: (filter: FilterValueTypes) => void
    addTask: (titleTask: string) => void
    checkTask: (id:string, e:boolean)=>void
    filter: FilterValueTypes
}

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}

export const Todolist: FC<TodolistPropsType> = (props) => {

    let [inpTaskValue, setInpTaskValue] = useState('')
    let [errorForTaskTitle, setErrorForTaskTitle] = useState(false)


    const removeTask = (id: string) => {
        props.removeTask(id)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter') {
            if(inpTaskValue.trim() !== ''){
                props.addTask(inpTaskValue)
                setInpTaskValue('')
            } else setErrorForTaskTitle(true)
        }
    }
    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setErrorForTaskTitle(false)
        setInpTaskValue(e.currentTarget.value)
    }
    const addTaskValueToState = (value:string)=>{
        if(value.trim() !== ''){
            props.addTask(value);
            setInpTaskValue('')
        } else
        setErrorForTaskTitle(true)
        return
    }
    const changeFilterValue = (value:FilterValueTypes)=>{
        props.filteringTask(value)
    }


    return (
        <div className="App">
            <div className= 'todolist' >
                <h3>{props.title}</h3>
                <div className= {errorForTaskTitle? 'error': ''} >
                    <input value={inpTaskValue} onChange={changeInputValueHandler}
                           onKeyPress={onKeyPressHandler }
                    />
                    <button onClick={() => addTaskValueToState(inpTaskValue)}>+</button>
                    {errorForTaskTitle &&<div className='errorMessage'>Title is required</div> }
                </div>
                <ul>
                    {
                        props.tasks.map((task) => {
                            const ChangeTaskCheck = (e:MouseEvent<HTMLInputElement>)=>{
                                props.checkTask(task.id , e.currentTarget.checked)
                            }
                               const removeTaskHandler = ()=> {  removeTask(task.id)}
                            return (
                                <li key={task.id}  className={task.isDone? 'isDone': ' '}>
                                    <input type="checkbox" checked={task.isDone} onClick={ChangeTaskCheck}/>
                                    <span>{task.taskTitle}</span>
                                    <button onClick={removeTaskHandler} >X
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button
                        className={props.filter === 'All'? "filterButton" : ' '}
                        onClick={() => {
                        changeFilterValue('All')
                    }}>All
                    </button>
                    <button
                        className={props.filter === 'ACTIVE'? "filterButton" : ''}
                        onClick={() => {
                        changeFilterValue('ACTIVE')
                    }}>Active
                    </button>
                    <button
                        className={props.filter === 'COMPLETED'? "filterButton" : ''}
                        onClick={() => {
                        changeFilterValue('COMPLETED')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

