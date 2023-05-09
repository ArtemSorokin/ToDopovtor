import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

import {AddItemForm} from "./AddItemFormPropsType";

import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeFilterTodoListAC, ChangeTodoListTitleAC,
    RemoveTodolistActionAC,
} from "./State/todolist-reducers";
import {AddTasklistAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./State/task-reducers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/Store/store";

export type FilterValueTypes = 'All' | 'ACTIVE' | 'COMPLETED'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueTypes
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let dispatch = useDispatch()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolistREDUCER)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state=> state.taskREDUCER)


    const removeTask = (id: string, todolistId: string) => {
        dispatch(RemoveTaskAC(id, todolistId))
    }
    const filteringTask = (filter: FilterValueTypes, todolistId: string) => {
        dispatch(ChangeFilterTodoListAC(todolistId, filter))
    }
    const addTask = (titleTask: string, todolistId: string) => {
        dispatch(AddTasklistAC(titleTask, todolistId))
    }
    const checkTask = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(ChangeTaskStatusAC(id, isDone, todolistId))
    }
    const changeTaskTitleValueHandler = (id: string, title: string, todoId: string) => {
        dispatch(ChangeTaskTitleAC(id, title,todoId ))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(RemoveTodolistActionAC(todolistId))
    }
    const addTodoList = (title: string) => {
        dispatch(AddTodolistAC(title))
    }
    const changeTodoTitleValueHandler = (title: string, todoId: string) => {
        dispatch(ChangeTodoListTitleAC(todoId, title))
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
                                        changeTitleValueHandler={changeTaskTitleValueHandler}
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

export default AppWithRedux;
