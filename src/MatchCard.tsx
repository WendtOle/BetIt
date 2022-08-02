import { Button, Typography, CardContent, CardActions } from "@mui/material"
import React, { ReactElement } from "react"

import { ContestantColumn, Suggestions } from './ContestantColumn';
import { CloseMatchDialog } from './CloseMatchDialog';
import { Better, Match } from "./types";
import { MatchCardTemplate } from "./MatchCardTemplate";
import { getBetters } from './utils';
import { DEFAULT_BET_AMOUNT } from './App';
import { ConfirmationDialog } from "./ConfirmationDialog";

interface MatchCardProps {
   match: Match,
   allBetters?: Better[],
   registerBet?: (contestant: string) => (better: string) => void,
   removeBet?: (contestant: string) => (better: string) => void,
   closeMatch?: (winner: string) => void,
   stopBettingOnMatch?: () => void;
}

export const MatchCard = ({ match,closeMatch, stopBettingOnMatch, allBetters,registerBet,removeBet}: MatchCardProps): ReactElement => {
   const { first, second, betsFirst, betsSecond, phase, winner } = match

   const currentMatchBetter = getBetters([match])

   const getTitle = () => {
      if (phase !== 'ended' || !winner) {
         return `${first} vs. ${second}`
      }
      const firstFormatted = first === winner ? <u>{first}</u> : <s>{first}</s>
      const secondFormatted = second === winner ? <u>{second}</u> : <s>{second}</s>

      return <div>{firstFormatted} vs. {secondFormatted}</div>
   }

   const getQuota = () => `${first} (${betsFirst.length}) - ${second} (${betsSecond.length})`

   const betterSuggestions: Suggestions[] = (allBetters ?? []).map(better => {
      const isSelected = currentMatchBetter.includes(better.name)
      const outOfMoney = better.amount < DEFAULT_BET_AMOUNT
      const reason = isSelected ? 'selected' : outOfMoney ? 'money' : undefined
      return {name: better.name, disabledReason: reason, label: `${better.name} (${better.amount} €)`}
   })

   return (
      <MatchCardTemplate >
         <CardContent>
            <Typography style={{ margin: 'auto', marginBottom: 8 }} variant="h4">{getTitle()}</Typography>
            <Typography style={{ margin: 'auto', marginBottom: 16 }}>Match Id: {match.id}</Typography>
            <Typography style={{ margin: 'auto', marginBottom: 16 }}>Quota: {getQuota()}</Typography>
            <ContestantColumn 
               registerBet={registerBet?.(first)} 
               disabled={phase !== 'betting'} 
               bets={betsFirst} 
               contestant={first} 
               betterSuggestions={betterSuggestions} 
               removeBet={removeBet?.(first)}/>
            <ContestantColumn 
               registerBet={registerBet?.(second)} 
               disabled={phase !== 'betting'} 
               bets={betsSecond} 
               contestant={second} 
               betterSuggestions={betterSuggestions} 
               removeBet={removeBet?.(second)}/>
         </CardContent>
         <CardActions>
            {phase === 'betting' && <ConfirmationDialog onSubmit={stopBettingOnMatch ?? console.log} buttonTitle="Close betting" title="Close betting?" />}
            {phase === 'fighting' && <CloseMatchDialog contestants={[first, second]} onClose={closeMatch} />}
         </CardActions>
      </MatchCardTemplate>

   )
}