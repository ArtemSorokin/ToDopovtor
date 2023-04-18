import React, {FC} from "react";
import {FilterValueTypes} from "./App";


type TodolistPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: number)=> void
    filteringTask: (filter:FilterValueTypes)=> void

}

export type TaskType = {
    id: number
    isDone: boolean
    taskTitle: string
}

export const Todolist: FC<TodolistPropsType> = (props)=> {

    const removeTask = (id: number)=> {
        props.removeTask(id)
    }

    return (
        <div className="App">
            <div className='todolist'>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {
                        props.task.map( (task)=> {
                            return (
                                <li>
                                    <input type="checkbox" checked={task.isDone}/> <span>{task.taskTitle}</span>
                                    <button onClick={()=>{removeTask(task.id)}}>X</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button onClick={()=>{props.filteringTask('All')}}>All</button>
                    <button onClick={()=>{props.filteringTask('ACTIVE')}}>Active</button>
                    <button onClick={()=>{props.filteringTask('COMPLETED')}}>Completed</button>
                </div>
            </div>
        </div>
    )
}