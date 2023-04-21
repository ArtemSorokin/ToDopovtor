import React, {ChangeEvent, ChangeEventHandler, FC, KeyboardEvent, KeyboardEventHandler, useState} from "react";
import {FilterValueTypes} from "./App";


type TodolistPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string) => void
    filteringTask: (filter: FilterValueTypes) => void
    addTask: (titleTask: string) => void
    checkTask: (id:string)=>void
}

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}

export const Todolist: FC<TodolistPropsType> = (props) => {

    let [inpTaskValue, setInpTaskValue] = useState('')
    // let [check, setCheck] = useState(false)


    const removeTask = (id: string) => {
        props.removeTask(id)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{

        if(e.key === 'Enter') {
            props.addTask(inpTaskValue)
            setInpTaskValue('')
        }
    }

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setInpTaskValue(e.currentTarget.value)
    }

    const addTaskValueToState = (value:string)=>{
        props.addTask(inpTaskValue);
        setInpTaskValue('')
    }

    const changeFilterValue = (value:FilterValueTypes)=>{
        props.filteringTask(value)
    }
    const onChangeCheck = (id:string)=>{
        props.checkTask(id)
        // setCheck(!check)
    }


    return (
        <div className="App">
            <div className='todolist'>
                <h3>{props.title}</h3>
                <div>
                    <input value={inpTaskValue} onChange={changeInputValueHandler}
                           onKeyPress={onKeyPressHandler }
                    />
                    <button onClick={() => addTaskValueToState(inpTaskValue)}>+</button>
                </div>
                <ul>
                    {
                        props.task.map((task) => {

                               const removeTaskHandler = ()=> {  removeTask(task.id)}
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} onClick={()=>onChangeCheck(task.id)}/>
                                    <span>{task.taskTitle}</span>
                                    <button onClick={removeTaskHandler} >X
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button onClick={() => {
                        changeFilterValue('All')
                    }}>All
                    </button>
                    <button onClick={() => {
                        changeFilterValue('ACTIVE')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        changeFilterValue('COMPLETED')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}