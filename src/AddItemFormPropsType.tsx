import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm:FC<AddItemFormPropsType> =(props)=>{
    let [inpTaskValue, setInpTaskValue] = useState('')
    let [errorForTaskTitle, setErrorForTaskTitle] = useState(false)

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setErrorForTaskTitle(false)
        setInpTaskValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter') {
            if(inpTaskValue.trim() !== ''){
                props.addItem(inpTaskValue)
                setInpTaskValue('')
            } else setErrorForTaskTitle(true)
        }
    }
    const addTaskValueToState = (value:string)=>{
        if(value.trim() !== ''){
            props.addItem(value);
            setInpTaskValue('')
        } else
            setErrorForTaskTitle(true)
        return
    }
    return(
        <div className= {errorForTaskTitle? 'error': ''} >
            <input value={inpTaskValue} onChange={changeInputValueHandler}
                   onKeyPress={onKeyPressHandler }
            />
            <button onClick={() => addTaskValueToState(inpTaskValue)}>+</button>
            {errorForTaskTitle &&<div className='errorMessage'>Title is required</div> }
        </div>
    )
}

