import { Autocomplete, Chip, TextField, Typography } from '@mui/material';
import React, { ReactElement } from "react"

interface ContestantColumnProps {
   contestant: string;
   bets: string[],
   disabled: boolean;
   betterSuggestions: string[],
   registerBet?: (name: string) => void;
}

export const ContestantColumn = ({ bets, registerBet, contestant, disabled, betterSuggestions }: ContestantColumnProps): ReactElement => {
   const label = `Bets on "${contestant}"`

   if (disabled) {
      return (
         <div>
            <Typography>{label}</Typography>
            <div style={{ border: 'solid 1px black', padding: 8 }}>
               {bets.map(bet => <Chip key={bet} label={bet} />)}
            </div>
         </div>
      )
   }
   return (
      <Autocomplete
         multiple
         value={bets}
         style={{ paddingTop: 8 }}
         onChange={(_, newValue, reason, details) => {
            if (!['createOption', 'selectOption'].includes(reason)) {
               return
            }
            if (!newValue) {
               return
            }
            if (!details?.option) {
               return
            }
            registerBet?.(details?.option)
         }}
         disableClearable
         renderInput={(inputProps) => <TextField {...inputProps} label={label} />}
         options={betterSuggestions}
      />
   )
}