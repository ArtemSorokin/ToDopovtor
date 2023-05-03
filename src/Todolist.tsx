import React, {FC, MouseEvent} from "react";
import {FilterValueTypes} from "./App";
import {AddItemForm} from "./AddItemFormPropsType";
import {EditableSpan} from "./EditableSpan";


type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filteringTask: (filter: FilterValueTypes, todolistId:string) => void
    addTask: (titleTask: string, todolistId: string) => void
    checkTask: (id:string, e:boolean, todolistId: string)=>void
    filter: FilterValueTypes
    removeTodolist: (todolistId: string)=> void
    changeTitleValueHandler: (id:string, title:string, todolistId:string)=>void
    changeTodoTitleValueHandler: ( title:string, todolistId:string)=>void
}

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}

export const Todolist: FC<TodolistPropsType> = (props) => {

    const removeTask = (id: string, todolistId: string) => {
        props.removeTask(id, todolistId)
    }
    const changeFilterValue = (value:FilterValueTypes, todolistId:string)=>{
        props.filteringTask(value, todolistId)
    }
    const removeTodolist = (todolistId:string)=>{
        props.removeTodolist(todolistId)
    }
    const addTask = (title:string)=>{
        props.addTask(title, props.id)
    }
    const changeTodoTitleValueHandler =(title: string)=>{
        props.changeTodoTitleValueHandler(title, props.id)
    }




    return (
        <div className="App">
            <div className= 'todolist' >
<h3>
    <EditableSpan title={props.title} changeTitleValueHandler={changeTodoTitleValueHandler}/>
</h3>
                <button onClick={()=>removeTodolist(props.id)}> X </button>

                <AddItemForm addItem={addTask}/>
                <ul>
                    {
                        props.tasks.map((task) => {
                            const ChangeTaskCheck = (e:MouseEvent<HTMLInputElement>)=>{
                                props.checkTask(task.id , e.currentTarget.checked, props.id)
                            }

                            const changeTitleValueHandler = (title:string)=>{
                                props.changeTitleValueHandler(task.id , title, props.id)
                            }
                               const removeTaskHandler = ()=> {  removeTask(task.id, props.id)}
                            return (
                                <li key={task.id}  className={task.isDone? 'isDone': ' '}>
                                    <input type="checkbox" checked={task.isDone} onClick={ChangeTaskCheck}/>
                                  <EditableSpan title={task.taskTitle} changeTitleValueHandler={changeTitleValueHandler}/>
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
                        changeFilterValue('All' , props.id)
                    }}>All
                    </button>
                    <button
                        className={props.filter === 'ACTIVE'? "filterButton" : ''}
                        onClick={() => {
                        changeFilterValue('ACTIVE', props.id)
                    }}>Active
                    </button>
                    <button
                        className={props.filter === 'COMPLETED'? "filterButton" : ''}
                        onClick={() => {
                        changeFilterValue('COMPLETED', props.id)
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

