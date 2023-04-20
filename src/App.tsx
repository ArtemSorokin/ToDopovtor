import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueTypes = 'All' |  'ACTIVE' | 'COMPLETED'




function App() {

    let [task, setTask] = useState<Array<TaskType>>([
        {id: v1(), isDone: false, taskTitle: 'JS'} ,
        {id: v1(), isDone: true, taskTitle: 'HTML'},
        {id: v1(), isDone: false, taskTitle: 'REACT'}
    ])



    let[filter, setFilter] = useState<FilterValueTypes>('All')

    const removeTask = (id:string)=>{
        let taskCopy = task.filter((t)=> t.id!==id )
        setTask(taskCopy)
    }

    const filteringTask = (filter:FilterValueTypes)=>{
        setFilter(filter)
    }

    const addTask = (titleTask: string)=> {
        let newTask = {
            id: v1(),
            isDone: false,
            taskTitle: titleTask
        }
       // let newArray =  task.push.apply(task, [newTask])

        setTask([...task, newTask])

    }

    let taskForTodolist = task

    if(filter === 'ACTIVE') {
        taskForTodolist = task.filter((t)=>!t.isDone)
    }  else if (filter === 'COMPLETED') {
        taskForTodolist = task.filter((t)=>t.isDone)
    }

    return (
        <div>
            <Todolist title={'What to Buy'} task={taskForTodolist}
                      removeTask={removeTask} filteringTask={filteringTask}
                      addTask={addTask} />
        </div>

    );
}

export default App;
