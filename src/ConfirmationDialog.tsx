import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from "react";

interface ConfirmationDialogProps {
    onSubmit: () => void;
    buttonTitle: string;
    title?: string;
}

export const ConfirmationDialog = ({buttonTitle, onSubmit, title}: ConfirmationDialogProps) => {
    const [open, setOpen] = useState(false)
    return (
        <>
        <Button onClick={() => setOpen(true)}>{buttonTitle}</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title ?? "Are you sure?"}</DialogTitle>
            <DialogActions>
                <Button onClick={() => {
                    onSubmit()
                    setOpen(false)
                }}>Yeaaahhh</Button>
            </DialogActions>
        </Dialog>
        </>
        
    )
}