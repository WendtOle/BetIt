import { Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import React, { ReactElement, useState } from "react"

interface CloseMatchDialogProps {
    contestants: string[]
    onClose: (name: string) => void
}

export const CloseMatchDialog = ({contestants, onClose}: CloseMatchDialogProps): ReactElement => {
    const [open, setOpen] = useState(false)
   return (
    <>
    <Button onClick={() => setOpen(true)}>Close match</Button>
    <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Who won?</DialogTitle>
        <DialogActions>
            {contestants.map(contestant => 
                (<Button key={contestant} onClick={() => {
                    setOpen(false)
                    onClose(contestant)
}
}>{contestant}</Button>)
            ) }
        </DialogActions>
    </Dialog>
    
    </>
   )
}