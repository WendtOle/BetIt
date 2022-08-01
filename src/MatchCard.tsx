import { Button, Typography, CardContent, CardActions } from "@mui/material"
import React, { ReactElement } from "react"
import { ContestantColumn } from './ContestantColumn';
import { CloseMatchDialog } from './CloseMatchDialog';
import { Match } from "./types";
import { MatchCardTemplate } from "./MatchCardTemplate";

interface MatchCardProps {
   match: Match,
   setMatch?: (match: Match) => void
}

export const MatchCard = ({match, setMatch}: MatchCardProps): ReactElement => {
   const {first, second, betsFirst, betsSecond, phase, winner} = match

   const closeBetting = () => {
      setMatch?.({...match, phase: 'fighting'})
   }

   const onNewBet = (contestant: string) => (name: string) => {
      if (first === contestant) {
         setMatch?.({...match, betsFirst: [...betsFirst, name]})
         return
      }
      setMatch?.({...match, betsSecond: [...betsSecond, name]})
   }

   const closeMatch = (name: string) => {
      setMatch?.({...match, phase: 'ended', winner: name})
   }

   const getTitle = () => {
      if (phase !== 'ended' || !winner) {
         return `${first} vs. ${second}`
      }
      const firstFormatted = first === winner ? <u>{first}</u> : <s>{first}</s>
      const secondFormatted = second === winner ? <u>{second}</u> : <s>{second}</s>

      return <div>{firstFormatted} vs. {secondFormatted}</div>
   }
   
   return (
      <MatchCardTemplate >
         <CardContent>
            <Typography style={{margin: 'auto', marginBottom: 16}} variant="h4">{getTitle()}</Typography>
            <ContestantColumn disabled={phase !== 'betting'} existingBets={betsFirst} contestant={first} onNewBet={onNewBet(first)}/>
            <ContestantColumn disabled={phase !== 'betting'} existingBets={betsSecond} contestant={second} onNewBet={onNewBet(second)}/>
         </CardContent>
         <CardActions>
            {phase === 'betting' && <Button onClick={closeBetting}>Close Betting</Button>}
            {phase === 'fighting' && <CloseMatchDialog contestants={[first, second]} onClose={closeMatch} />}
         </CardActions>
      </MatchCardTemplate>
   
   )
}