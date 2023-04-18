import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValueTypes = 'All' |  'ACTIVE' | 'COMPLETED'




function App() {

    let [task, setTask] = useState<Array<TaskType>>([
        {id: 1, isDone: false, taskTitle: 'JS'} ,
        {id: 2, isDone: true, taskTitle: 'HTML'},
        {id: 3, isDone: false, taskTitle: 'REACT'}
    ])

    let[filter, setFilter] = useState<FilterValueTypes>('All')

    const removeTask = (id:number)=>{
        let taskCopy = task.filter((t)=> t.id!==id )
        setTask(taskCopy)
    }

    const filteringTask = (filter:FilterValueTypes)=>{
        setFilter(filter)
    }

    let taskForTodolist = task

    if(filter === 'ACTIVE') {
        taskForTodolist = task.filter((t)=>!t.isDone)
    }  else if (filter === 'COMPLETED') {
        taskForTodolist = task.filter((t)=>t.isDone)
    }

    return (
        <div>
            <Todolist title={'What to Buy'} task={taskForTodolist} removeTask={removeTask}  filteringTask={filteringTask}/>
        </div>

    );
}

export default App;
