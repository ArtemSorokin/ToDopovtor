import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

import {AddItemForm} from "./AddItemForm";

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


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTaskAC(id, todolistId))
    }, [dispatch])
    const filteringTask = useCallback((filter: FilterValueTypes, todolistId: string) => {
        dispatch(ChangeFilterTodoListAC(todolistId, filter))
    }, [dispatch])
    const addTask = useCallback((titleTask: string, todolistId: string) => {
        dispatch(AddTasklistAC(titleTask, todolistId))
    }, [dispatch])
    const checkTask = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(ChangeTaskStatusAC(id, isDone, todolistId))
    }, [dispatch])
    const changeTaskTitleValueHandler = useCallback((id: string, title: string, todoId: string) => {
        dispatch(ChangeTaskTitleAC(id, title,todoId ))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistActionAC(todolistId))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    },[dispatch])
    const changeTodoTitleValueHandler = useCallback((title: string, todoId: string) => {
        dispatch(ChangeTodoListTitleAC(todoId, title))
    }, [dispatch])


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

                        let AlltaskForTodolist = tasks[tl.id]
                       let  taskForTodolist = AlltaskForTodolist


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
