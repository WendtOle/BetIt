import { Typography } from "@mui/material"
import React, { ReactElement } from "react"
import { BetDialog } from './BetDialog';

interface ContestantColumnProps {
   contestant: string;
   onNewBet: (name: string) => void;
   existingBets: string[],
   disabled: boolean;
}

export const ContestantColumn = ({ existingBets, onNewBet, contestant, disabled }: ContestantColumnProps): ReactElement => {
   return (
      <div>
         <Typography>Bets on "{contestant}" ({existingBets.length})</Typography>
         <span style={{ marginLeft: 8 }}>{existingBets.join(', ')}</span>
         {!disabled && <BetDialog contestant={contestant} onSubmit={onNewBet} />}
      </div>
   )
}