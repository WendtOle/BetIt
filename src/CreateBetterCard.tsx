import { CardActions, CardContent, Button, Typography } from "@mui/material"
import { InputField } from "./InputField"
import { MatchCardTemplate } from "./MatchCardTemplate"
import { useState } from 'react';

interface CreateBetterCardProps {
    onAdd: (name: string) => void,
    existingBetters: string[]
}

export const CreateBetterCard = ({ onAdd , existingBetters}: CreateBetterCardProps) => {
    const [name, setName] = useState("")

    const onClick = () => {
        onAdd(name)
        setName("")
    }

    return (<MatchCardTemplate>
        <Typography style={{ margin: 'auto', marginBottom: 16 }} variant="h4">Add better</Typography>
        <CardContent>
            <InputField label="name" value={name} onValueChange={(value) => setName(value)} />
        </CardContent>
        <CardActions >
            <Button disabled={name === '' || existingBetters.includes(name)} onClick={onClick}>Submit</Button>
        </CardActions>
    </MatchCardTemplate>)
}