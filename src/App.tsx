import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueTypes = 'All' |  'ACTIVE' | 'COMPLETED'




function App() {

    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), isDone: false, taskTitle: 'JS'} ,
        {id: v1(), isDone: true, taskTitle: 'HTML'},
        {id: v1(), isDone: false, taskTitle: 'REACT'}
    ])

    let[filter, setFilter] = useState<FilterValueTypes>('All')

    const removeTask = (id:string)=>{
        let taskCopy = tasks.filter((t)=> t.id!==id )
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

        setTask([...tasks, newTask])

    }

    const checkTask = (id: string, isDone:boolean)=>{
      let task = tasks.find(t=>t.id===id)
        if (task){task.isDone = isDone
            setTask([...tasks])
        } else return

    }

    let taskForTodolist = tasks

    if(filter === 'ACTIVE') {
        taskForTodolist = tasks.filter((t)=>!t.isDone)
    }  else if (filter === 'COMPLETED') {
        taskForTodolist = tasks.filter((t)=>t.isDone)
    }

    return (
        <div>
            <Todolist title={'What to Buy'} tasks={taskForTodolist}
                      removeTask={removeTask} filteringTask={filteringTask}
                      addTask={addTask} checkTask={checkTask} filter={filter}/>
        </div>

    );
}

export default App;
