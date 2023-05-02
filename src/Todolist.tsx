import React, {
    ChangeEvent,
    FC,
    KeyboardEvent,
    MouseEvent,
    useState
} from "react";
import {FilterValueTypes} from "./App";


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
}

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}

export const Todolist: FC<TodolistPropsType> = (props) => {

    let [inpTaskValue, setInpTaskValue] = useState('')
    let [errorForTaskTitle, setErrorForTaskTitle] = useState(false)


    const removeTask = (id: string, todolistId: string) => {
        props.removeTask(id, todolistId)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter') {
            if(inpTaskValue.trim() !== ''){
                props.addTask(inpTaskValue, props.id)
                setInpTaskValue('')
            } else setErrorForTaskTitle(true)
        }
    }
    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setErrorForTaskTitle(false)
        setInpTaskValue(e.currentTarget.value)
    }
    const addTaskValueToState = (value:string, todolistId: string)=>{
        if(value.trim() !== ''){
            props.addTask(value, todolistId);
            setInpTaskValue('')
        } else
        setErrorForTaskTitle(true)
        return
    }
    const changeFilterValue = (value:FilterValueTypes, todolistId:string)=>{
        props.filteringTask(value, todolistId)
    }
    const removeTodolist = (todolistId:string)=>{
        props.removeTodolist(todolistId)
    }


    return (
        <div className="App">
            <div className= 'todolist' >

                <h3>{props.title}<button onClick={()=>removeTodolist(props.id)}> X </button>  </h3>

                <div className= {errorForTaskTitle? 'error': ''} >
                    <input value={inpTaskValue} onChange={changeInputValueHandler}
                           onKeyPress={onKeyPressHandler }
                    />
                    <button onClick={() => addTaskValueToState(inpTaskValue, props.id)}>+</button>
                    {errorForTaskTitle &&<div className='errorMessage'>Title is required</div> }
                </div>
                <ul>
                    {
                        props.tasks.map((task) => {
                            const ChangeTaskCheck = (e:MouseEvent<HTMLInputElement>)=>{
                                props.checkTask(task.id , e.currentTarget.checked, props.id)
                            }
                               const removeTaskHandler = ()=> {  removeTask(task.id, props.id)}
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

