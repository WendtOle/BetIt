import { CardActions, CardContent, Button, Typography } from "@mui/material"
import { MatchCardTemplate } from "./MatchCardTemplate"
import { Better } from "./types";

interface BetterCardProps {
    better: Better
    addToAccount: (amount: number, message: string) => void;
    resetAccount: () => void;
}

export const BetterCard = ({ better, addToAccount, resetAccount }: BetterCardProps) => {
    return (<MatchCardTemplate>
        <Typography style={{ margin: 'auto', marginBottom: 16 }} variant="h4">{better.name}</Typography>
        <CardContent >
            <Typography style={{ margin: 'auto', marginBottom: 16 }}>Amount: {better.amount}</Typography>
            <div style={{maxHeight: 100, overflow: "scroll"}}>
                {better.history.map((entry, index) => (<div key={index + entry }>{entry}</div>))} 
            </div>
        </CardContent>
        <CardActions >
            <Button onClick={() => addToAccount(0.5, 'load 0.5')}>+ 0.50</Button>
            <Button onClick={() => addToAccount(1,'load 1')}>+ 1</Button>
            <Button onClick={() => addToAccount(2,'load 2')}>+ 2</Button>
            <Button onClick={resetAccount}>Clear</Button>
        </CardActions>
    </MatchCardTemplate>)
}