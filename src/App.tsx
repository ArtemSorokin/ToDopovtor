import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";




function App() {

    let task1 = [
        {id: 1, isDone: false, taskTitle: 'JS'} ,
        {id: 2, isDone: true, taskTitle: 'HTML'},
        {id: 3, isDone: false, taskTitle: 'REACT'}
    ]
    let task2 = [
        {id: 4, isDone: false, taskTitle: 'SYS'} ,
        {id: 5, isDone: true, taskTitle: 'SAS'},
        {id: 6, isDone: false, taskTitle: 'VAS'}
    ]

    return (
        <div>
            <Todolist title={'What to Buy'} task={task1} />
            <Todolist title={'What to Buy'} task={task2} />

        </div>

    );
}

export default App;
