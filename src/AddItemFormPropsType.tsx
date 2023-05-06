import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm:FC<AddItemFormPropsType> =(props)=>{
    let [inpTaskValue, setInpTaskValue] = useState('')
    let [errorForTaskTitle, setErrorForTaskTitle] = useState('')

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setErrorForTaskTitle('')
        setInpTaskValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter') {
            if(inpTaskValue.trim() !== ''){
                props.addItem(inpTaskValue)
                setInpTaskValue('')
            } else setErrorForTaskTitle("Title is required")
        }
    }
    const addTaskValueToState = (value:string)=>{
        if(value.trim() !== ''){
            props.addItem(value);
            setInpTaskValue('')
        } else
            setErrorForTaskTitle("Title is required")
        return
    }
    return(
        <div  >
            <TextField variant={'outlined'}
                       label={'Введите название'}
                       value={inpTaskValue} onChange={changeInputValueHandler}
                   onKeyPress={onKeyPressHandler }
                       error={!!errorForTaskTitle}
                       helperText={!!errorForTaskTitle ? errorForTaskTitle : ''}
            />
            <IconButton onClick={() => addTaskValueToState(inpTaskValue)}   color={"primary"}>
                < AddBoxIcon fontSize={'large'} />
            </IconButton>
        </div>
    )
}

