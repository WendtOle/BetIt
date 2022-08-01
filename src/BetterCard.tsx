import { CardActions, CardContent, Button, Typography } from "@mui/material"
import { MatchCardTemplate } from "./MatchCardTemplate"
import { Better } from "./types";

interface BetterCardProps {
    better: Better
    onUpdateAmount: (amount: number, message: string) => void;
}

export const BetterCard = ({ better, onUpdateAmount }: BetterCardProps) => {

    return (<MatchCardTemplate>
        <Typography style={{ margin: 'auto', marginBottom: 16 }} variant="h4">{better.name}</Typography>
        <CardContent>
            <Typography style={{ margin: 'auto', marginBottom: 16 }}>Amount: {better.amount}</Typography>
            {better.history.map(entry => (<div>{entry}</div>))}
        </CardContent>
        <CardActions >
            <Button onClick={() => onUpdateAmount(0.5, 'load 0.5')}>+ 0.50</Button>
            <Button onClick={() => onUpdateAmount(1,'load 1')}>+ 1</Button>
            <Button onClick={() => onUpdateAmount(2,'load 2')}>+ 2</Button>
        </CardActions>
    </MatchCardTemplate>)
}