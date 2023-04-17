import React, {FC} from "react";


type TodolistPropsType = {
    title: string
    task: Array<TaskType>

}

export type TaskType = {
    id?: number
    isDone: boolean
    taskTitle: string
}

export const Todolist: FC<TodolistPropsType> = (props)=> {

    return (
        <div className="App">
            <div className='todolist'>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].taskTitle}</span></li>
                    <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].taskTitle}</span></li>
                    <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].taskTitle}</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}