import { TextField } from "@mui/material"
import React from "react"

interface InputFieldProps {
    value: string,
    onValueChange: (value: string) => void
    label?: string;
}

export const InputField = ({ value, onValueChange, label }: InputFieldProps) => {

    return (<TextField
        label={label}
        size='small'
        value={value}
        style={{ marginTop: 8 }}
        onChange={e => {
            const newValue = e.currentTarget.value
            if (!newValue) {
                return
            }
            onValueChange(newValue)
        }}
    />)
}