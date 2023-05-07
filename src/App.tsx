import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemFormPropsType";
import * as cluster from "cluster";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValueTypes = 'All' | 'ACTIVE' | 'COMPLETED'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueTypes
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let tolistId1 = v1()
    let tolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [{id: tolistId1, title: 'What to learn', filter: 'All'},
            {id: tolistId2, title: 'What to Byu', filter: 'All'}]
    )

    let [tasks, setTask] = useState<TaskStateType>({
        [tolistId1]: [{id: v1(), isDone: false, taskTitle: 'JS'},
            {id: v1(), isDone: true, taskTitle: 'HTML'},
            {id: v1(), isDone: false, taskTitle: 'REACT'}
        ],
        [tolistId2]: [{id: v1(), isDone: false, taskTitle: 'JS'},
            {id: v1(), isDone: false, taskTitle: 'Milk'},
            {id: v1(), isDone: false, taskTitle: 'Beer'}
        ]
    })

    const removeTodolist = (todolistId: string) => {
        let newTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolist)

        delete tasks[todolistId]
        setTask({...tasks})

    }
    const removeTask = (id: string, todolistId: string) => {
        let tsk = tasks[todolistId]
        let taskCopy = tsk.filter((t) => t.id !== id)
        tasks[todolistId] = taskCopy

        setTask({...tasks})
    }
    const filteringTask = (filter: FilterValueTypes, todolistId: string) => {
        let todo = todolists.find(tl => tl.id === todolistId)
        if (todo) {
            todo.filter = filter
            setTodolists([...todolists])
        }
    }
    const addTask = (titleTask: string, todolistId: string) => {
        let newTask = {
            id: v1(),
            isDone: false,
            taskTitle: titleTask
        }
        let tsk = tasks[todolistId]
        tasks[todolistId] = [...tsk, newTask]
        setTask({...tasks})
    }
    const checkTask = (id: string, isDone: boolean, todolistId: string) => {
        let task = tasks[todolistId].find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTask({...tasks})
        } else return

    }
    const addTodoList = (title: string) => {

        let newTodolist: TodolistType = {
            id: v1(), title: title, filter: 'All'
        }

        setTodolists([newTodolist, ...todolists])
        setTask({[newTodolist.id]: [], ...tasks})
    }
    const changeTitleValueHandler = (id: string, title: string, todoId: string) => {
        let task = tasks[todoId].find(t => t.id === id)
        if (task) {
            task.taskTitle = title
            setTask({...tasks})
        } else return

    }
    const changeTodoTitleValueHandler = (title: string, todoId: string) => {
        let todo = todolists.find(td => td.id === todoId)
        if (todo) {
            todo.title = title
            setTodolists([...todolists])
        }

    }

    return (
        <div>

            <AppBar position={'static'} >
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h5'>
                        News
                    </Typography>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: '30 px'} }>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={2}>
                    {todolists.map((tl) => {

                        let taskForTodolist = tasks[tl.id]

                        if (tl.filter === 'ACTIVE') {
                            taskForTodolist = taskForTodolist.filter((t) => !t.isDone)
                        } else if (tl.filter === 'COMPLETED') {
                            taskForTodolist = taskForTodolist.filter((t) => t.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3}> // подогнать
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title} tasks={taskForTodolist}
                                        removeTask={removeTask} filteringTask={filteringTask}
                                        addTask={addTask} checkTask={checkTask} filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTitleValueHandler={changeTitleValueHandler}
                                        changeTodoTitleValueHandler={changeTodoTitleValueHandler}
                                    />
                                </Paper>

                            </Grid>

                        )

                    })}
                </Grid>

            </Container>
        </div>


    );
}

export default App;
