import { Button, Typography, CardContent, CardActions } from "@mui/material"
import React, { ReactElement } from "react"

import { ContestantColumn } from './ContestantColumn';
import { CloseMatchDialog } from './CloseMatchDialog';
import { Better, Match } from "./types";
import { MatchCardTemplate } from "./MatchCardTemplate";
import { getBetters } from './utils';

interface MatchCardProps {
   match: Match,
   setMatch?: (match: Match) => void
   allBetters?: Better[],
   registerBet?: (contestant: string) => (better: string) => void,
   closeMatch?: (winner: string) => void
}

export const MatchCard = ({ match,closeMatch,  setMatch, allBetters,registerBet }: MatchCardProps): ReactElement => {
   const { first, second, betsFirst, betsSecond, phase, winner } = match

   const currentMatchBetter = getBetters([match])

   const closeBetting = () => {
      setMatch?.({ ...match, phase: 'fighting' })
   }

   const getTitle = () => {
      if (phase !== 'ended' || !winner) {
         return `${first} vs. ${second}`
      }
      const firstFormatted = first === winner ? <u>{first}</u> : <s>{first}</s>
      const secondFormatted = second === winner ? <u>{second}</u> : <s>{second}</s>

      return <div>{firstFormatted} vs. {secondFormatted}</div>
   }

   const betterSuggestions = (allBetters ?? []).filter(better => !currentMatchBetter.includes(better.name)).map(({name}) => name)

   return (
      <MatchCardTemplate >
         <CardContent>
            <Typography style={{ margin: 'auto', marginBottom: 8 }} variant="h4">{getTitle()}</Typography>
            <Typography style={{ margin: 'auto', marginBottom: 16 }}>Match Id: {match.id}</Typography>
            <ContestantColumn registerBet={registerBet?.(first)} disabled={phase !== 'betting'} bets={betsFirst} contestant={first} betterSuggestions={betterSuggestions} />
            <ContestantColumn registerBet={registerBet?.(second)} disabled={phase !== 'betting'} bets={betsSecond} contestant={second} betterSuggestions={betterSuggestions} />
         </CardContent>
         <CardActions>
            {phase === 'betting' && <Button onClick={closeBetting}>Close Betting</Button>}
            {phase === 'fighting' && <CloseMatchDialog contestants={[first, second]} onClose={closeMatch} />}
         </CardActions>
      </MatchCardTemplate>

   )
}