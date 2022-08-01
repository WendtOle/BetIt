import { Button, Typography, CardActions, CardContent } from '@mui/material';
import React, { ReactElement, useState } from "react"
import { InputField } from "./InputField";
import { MatchCardTemplate } from "./MatchCardTemplate";

interface CreateNewMatchProps {
    addMatch: (contestants: string[]) => void,
}

export const CreateMatchCard = ({ addMatch }: CreateNewMatchProps): ReactElement => {
    const [match, setMatch] = useState<{ first: string, second: string }>({ first: "", second: "" })

    const disabled = match.first === '' || match.second === ''

    const onSubmit = () => {
        if (disabled) {
            return
        }
        addMatch([match.first, match.second])
        setMatch(cur => ({ ...cur, first: '', second: '' }))
    }

    return (
        <MatchCardTemplate>
            <CardContent>
                <Typography style={{ margin: 'auto', marginBottom: 16 }} variant="h4">Create match</Typography>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <InputField label="Fighter One" value={match.first} onValueChange={(newName) => setMatch((cur) => ({ ...cur, first: newName }))} />
                    <InputField label="Fighter Two" value={match.second} onValueChange={(newName) => setMatch((cur) => ({ ...cur, second: newName }))} />
                </div>
            </CardContent>
            <CardActions>
                <Button disabled={disabled} onClick={onSubmit}>Submit</Button>
            </CardActions>
        </MatchCardTemplate>

    )
}