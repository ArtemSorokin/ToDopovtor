import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

export type AddItemForm = {
    addItem: (title: string) => void
}


export const AddItemForm:FC<AddItemForm> = React.memo ((props)=>{
    console.log('AddItemFormCalled')

    let [inpTaskValue, setInpTaskValue] = useState('')
    let [errorForTaskTitle, setErrorForTaskTitle] = useState('')

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>)=> {

        if(errorForTaskTitle !== null){
            setErrorForTaskTitle('')
            setInpTaskValue(e.currentTarget.value)
        }else return
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter') {
            if(inpTaskValue.trim() !== null){
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
} )

