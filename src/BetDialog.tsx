import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Autocomplete, TextField } from "@mui/material"
import React, { ReactElement, useState } from "react"

interface BetDialogProps {
    contestant: string,
    onSubmit: (name: string) => void,
    betterSuggestions: string[];
}

export const BetDialog = ({ onSubmit, contestant, betterSuggestions }: BetDialogProps): ReactElement => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    return (
        <>
            <IconButton onClick={() => setOpen(true)}>+</IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Who wants to bet on {contestant}?</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        value={name}
                        onInputChange={(_, newValue) => {
                            if (!newValue) {
                                setName('')
                                return
                            }
                            setName(newValue)
                        }}
                        freeSolo
                        renderInput={(inputProps) => <TextField {...inputProps} />}
                        options={betterSuggestions}
                    />

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