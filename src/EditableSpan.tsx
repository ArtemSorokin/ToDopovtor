import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    title: string
    changeTitleValueHandler: (title:string)=> void
}
export const EditableSpan: FC<EditableSpanPropsType> =  React.memo((props) => {

    console.log('Editable Span called')

    let [editableMode, setEditableMode]= useState(false)
    let [esInputValue, setesInputValue] = useState('')

    const activetedEditMode = ()=> {
        setEditableMode(true)
        setesInputValue(props.title)
    }
    const DisactivetedEditMode = ()=>{
        setEditableMode(false)

        props.changeTitleValueHandler(esInputValue)

    }

    const ChangeTitleHeandler = (e:ChangeEvent<HTMLInputElement>)=>{

        setesInputValue(e.currentTarget.value)
    }


    return (
        editableMode ?<TextField value={esInputValue} autoFocus onBlur={DisactivetedEditMode} onChange={ChangeTitleHeandler}/>  : <span onDoubleClick={activetedEditMode}  >{props.title} </span>

    )
})