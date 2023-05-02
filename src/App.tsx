import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueTypes = 'All' |  'ACTIVE' | 'COMPLETED'
 type TodolistType = {
     id: string
     title:string
     filter: FilterValueTypes
 }


function App() {



    let tolistId1 = v1()
    let tolistId2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>(
        [{id: tolistId1, title: 'What to learn', filter: 'ACTIVE'},
            {id: tolistId2, title: 'What to Byu', filter: 'COMPLETED'}]
    )

    let [tasks, setTask] = useState({
            [tolistId1]: [{id: v1(), isDone: false, taskTitle: 'JS'} ,
                {id: v1(), isDone: true, taskTitle: 'HTML'},
                {id: v1(), isDone: false, taskTitle: 'REACT'}
            ],
        [tolistId2]: [{id: v1(), isDone: false, taskTitle: 'JS'} ,
            {id: v1(), isDone: true, taskTitle: 'Milk'},
            {id: v1(), isDone: false, taskTitle: 'Beer'}
        ]

        }
    )

    const removeTodolist = (todolistId:string)=>{
        let newTodolist = todolist.filter(tl => tl.id !== todolistId)
        setTodolist(newTodolist)

        delete tasks[todolistId]
        setTask({...tasks})

    }

    // let[filter, setFilter] = useState<FilterValueTypes>('All')

    const removeTask = (id:string, todolistId: string)=>{
        let tsk = tasks[todolistId]
        let taskCopy = tsk.filter((t)=> t.id!==id )
        tasks[todolistId] = taskCopy

        setTask({...tasks})
    }

    const filteringTask = (filter:FilterValueTypes, todolistId: string)=>{
          let todo = todolist.find(tl => tl.id === todolistId)
        if(todo) {
            todo.filter = filter
            setTodolist([...todolist])
        }
    }

    const addTask = (titleTask: string, todolistId:string)=> {
        let newTask = {
            id: v1(),
            isDone: false,
            taskTitle: titleTask
        }
        let tsk = tasks[todolistId]
        tasks[todolistId] = [...tsk, newTask ]
         setTask({...tasks })
    }

    const checkTask = (id: string, isDone:boolean, todolistId: string)=>{
      let task = tasks[todolistId].find(t=>t.id===id)
        if (task){task.isDone = isDone
            setTask({...tasks})
        } else return

    }



    return (
        <div>
            {todolist.map((tl)=>{
                let taskForTodolist = tasks[tl.id]

                if(tl.filter === 'ACTIVE') {
                    taskForTodolist = taskForTodolist.filter((t)=>!t.isDone)
                }  else if (tl.filter === 'COMPLETED') {
                    taskForTodolist = taskForTodolist.filter((t)=>t.isDone)
                }

                return( <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title} tasks={taskForTodolist}
                    removeTask={removeTask} filteringTask={filteringTask}
                    addTask={addTask} checkTask={checkTask} filter={tl.filter}
                    removeTodolist={removeTodolist}
                    />
                )

            })}

        </div>

    );
}

export default App;
