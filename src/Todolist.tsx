import React, {FC, useCallback} from "react";
import {FilterValueTypes} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";


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

export const Todolist: FC<TodolistPropsType> = React.memo((props) => {

        console.log('Todolist Called')

        const removeTask = (id: string, todolistId: string) => {
            props.removeTask(id, todolistId)
        }
        const changeFilterValue = (value:FilterValueTypes, todolistId:string)=>{
            props.filteringTask(value, todolistId)
        }
        const removeTodolist = (todolistId:string)=>{
            props.removeTodolist(todolistId)
        }
        const addTask = useCallback((title:string)=>{
            props.addTask(title, props.id)
        },[props.addTask, props.id])
        const changeTodoTitleValueHandler = useCallback((title: string)=>{
            props.changeTodoTitleValueHandler(title, props.id)
        }, [props.title])

    let taskForTodolist = props.tasks
    if (props.filter === 'ACTIVE') {
        taskForTodolist = props.tasks.filter((t) => !t.isDone)
    } else if (props.filter === 'COMPLETED') {
        taskForTodolist = props.tasks.filter((t) => t.isDone)
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
                            props.tasks.map((t)=>{
                                return (
                                    <Task  key={t.id}
                                        task={t} todolistId={props.id} removeTask={removeTask}
                                           checkTask={props.checkTask} changeTitleValueHandler={props.changeTitleValueHandler} />
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
)



