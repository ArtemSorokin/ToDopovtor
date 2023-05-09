import React, {ChangeEvent, FC, MouseEvent} from "react";
import {FilterValueTypes} from "./AppWithRedux";
import {AddItemForm} from "./AddItemFormPropsType";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


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
    <IconButton aria-label="delete" size="large" >
        <Delete onClick={()=>removeTodolist(props.id)} color={'warning'}/>
    </IconButton>
</h3>


                <AddItemForm addItem={addTask}/>
                <ul>
                    {
                        props.tasks.map((task) => {
                            const ChangeTaskCheck = (e:ChangeEvent<HTMLInputElement>)=>{
                                props.checkTask(task.id , e.currentTarget.checked, props.id)
                            }

                            const changeTitleValueHandler = (title:string)=>{
                                props.changeTitleValueHandler(task.id , title, props.id)
                            }
                               const removeTaskHandler = ()=> {  removeTask(task.id, props.id)}
                            return (
                                <li key={task.id}  className={task.isDone? 'isDone': ' '}>

                                    <Checkbox checked={task.isDone} onChange={ChangeTaskCheck}/>
                                  <EditableSpan title={task.taskTitle} changeTitleValueHandler={changeTitleValueHandler}/>

                                    <IconButton aria-label="delete" size="large" >
                                        <Delete onClick={removeTaskHandler} color={'warning'}/>
                                    </IconButton>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <Button variant={(props.filter === 'All')? "contained" : 'outlined'}
                        onClick={() => {
                        changeFilterValue('All' , props.id)
                    }}>All
                    </Button>
                    <Button
                        variant={props.filter === 'ACTIVE'? "contained" : 'outlined'}
                        onClick={() => {
                        changeFilterValue('ACTIVE', props.id)
                    }}>Active
                    </Button>
                    <Button
                        variant={props.filter === 'COMPLETED'? "contained" : 'outlined'}
                        onClick={() => {
                        changeFilterValue('COMPLETED', props.id)
                    }}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}

