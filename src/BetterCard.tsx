import { CardActions, CardContent, Button, Typography } from "@mui/material"
import { MatchCardTemplate } from "./MatchCardTemplate"
import { Better } from "./types";

interface BetterCardProps {
    better: Better
    onUpdateAmount: (amount: number) => void;
}

export const BetterCard = ({ better, onUpdateAmount }: BetterCardProps) => {

    return (<MatchCardTemplate>
        <Typography style={{ margin: 'auto', marginBottom: 16 }} variant="h4">{better.name}</Typography>
        <CardContent>
            <Typography style={{ margin: 'auto', marginBottom: 16 }}>Amount: {better.amount}</Typography>
        </CardContent>
        <CardActions >
            <Button onClick={() => onUpdateAmount(0.5)}>+ 0.50</Button>
            <Button onClick={() => onUpdateAmount(1)}>+ 1</Button>
            <Button onClick={() => onUpdateAmount(2)}>+ 2</Button>
        </CardActions>
    </MatchCardTemplate>)
}