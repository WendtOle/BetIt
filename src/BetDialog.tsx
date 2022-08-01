import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material"
import React, { ReactElement, useState } from "react"
import { InputField } from "./InputField"

interface BetDialogProps {
    contestant: string,
    onSubmit: (name: string) => void
}

export const BetDialog = ({onSubmit, contestant}: BetDialogProps): ReactElement => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
   return (
    <>
    <IconButton onClick={() => setOpen(true)}>+</IconButton>
    <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Who wants to bet on {contestant}?</DialogTitle>
        <DialogContent>
            <InputField value={name} onValueChange={setName}/>
        </DialogContent>
        <DialogActions>
            <Button
                disabled={name === ''}
                onClick={() => {
                    setOpen(false)
                    onSubmit(name)
                    setName("")
                }}>
            Submit</Button>
        </DialogActions>
    </Dialog>
    
    </>
   )
}