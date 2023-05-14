import React, {ChangeEvent, FC, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

export type TaskComponentPropsType = {
    checkTask: (id: string, e: boolean, todolistId: string) => void
    changeTitleValueHandler: (id: string, title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    todolistId: string


}
export const Task: FC<TaskComponentPropsType> = React.memo((props) => {
    const ChangeTaskCheck = (e: ChangeEvent<HTMLInputElement>) => {
        props.checkTask(props.task.id, e.currentTarget.checked, props.todolistId)
    }

    const changeTitleValueHandler = useCallback( (title: string) => {
        props.changeTitleValueHandler(props.task.id, title, props.todolistId)
    }, [ props.changeTitleValueHandler, props.task.id, props.todolistId ])
    const removeTaskHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    return (
        <li key={props.task.id} className={props.task.isDone ? 'isDone' : ' '}>

            <Checkbox checked={props.task.isDone} onChange={ChangeTaskCheck}/>
            <EditableSpan title={props.task.taskTitle} changeTitleValueHandler={changeTitleValueHandler}/>

            <IconButton aria-label="delete" size="large">
                <Delete onClick={removeTaskHandler} color={'warning'}/>
            </IconButton>
        </li>
    )
})