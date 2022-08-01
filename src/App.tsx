import { Grid } from "@mui/material"
import React, { ReactElement, useState } from "react"
import { ActiveMatchesPage } from "./ActiveMatchesPage";
import { BettersPage } from "./BettersPage";
import { EndedMatchesPage } from "./EndedMatchesPage";
import { Navigation } from "./Navigation";
import { Better, Match, Page } from "./types";
import { defaultMatch, randomId, getBetters, defaultBetters } from './utils';

const DEFAULT_BET_AMOUNT = 1

export const App = (): ReactElement => {
  const [matches, setMatches] = useState<Match[]>([defaultMatch])
  const [page, setPage] = useState<Page>(Page.active)
  const [betters, setBetters] = useState<Better[]>(defaultBetters)

  const { active, ended } = matches.reduce((acc: { active: Match[], ended: Match[] }, next: Match) => {
    if (next.phase === 'ended') {
      return { ...acc, ended: [...acc.ended, next] }
    }
    return { ...acc, active: [...acc.active, next] }
  }, { active: [], ended: [] })

  const addMatch = (contestants: string[]) => setMatches(cur => ([{
    first: contestants[0],
    second: contestants[1],
    betsFirst: [],
    betsSecond: [],
    phase: 'betting',
    id: randomId()
  }, ...cur]))

  const onUpdateAmount = (name: string) => (amount: number, message: string) => {
    setBetters(cur => {
      return cur.map(better => {
        if (better.name !== name) {
          return better
        }
        return { ...better, amount: better.amount + amount, history: [...better.history, message] }
      })
    })
  }

  const registerBet = (matchId: string) => (contestant: string) => (better: string) => {
    onUpdateAmount(better)(-DEFAULT_BET_AMOUNT, `(-1) bet on "${contestant}" in match "${matchId}"`)
    setMatches(cur => cur.map(match => {
      if (match.id !== matchId) {
        return match
      }
      return {
        ...match,
        betsFirst: match.first === contestant ? [...match.betsFirst, better] : match.betsFirst,
        betsSecond: match.second === contestant ? [...match.betsSecond, better] : match.betsSecond
      }
    }))
  }

  const closeMatch = (matchId: string) => (winner: string) => {
    const match = matches.find(match => match.id === matchId)
    if (!match){
      throw Error('match should exists')
    }
    const pot = match.betsFirst.length + match.betsSecond.length
    const betWinners = winner === match.first ? match.betsFirst : match. betsSecond
    const winning = pot / betWinners.length
    betWinners.forEach(betWinner => {
      onUpdateAmount(betWinner)(winning, `(+${winning}) - won bet in match ${matchId} with winning "${winner}"`)
    })
    setMatches(cur => cur.map(match => {
      if (match.id !== matchId) {
        return match
      }
      return {
        ...match,
        phase: 'ended',
        winner
      }
    }))
  }

  return (
    <>
      <Grid container spacing={2} style={{ marginBottom: 62 }}>
        {page === Page.active && <ActiveMatchesPage
          matches={active}
          setMatches={setMatches}
          registerBet={registerBet}
          closeMatch={closeMatch}
          allBetters={betters.filter(better => better.amount >= DEFAULT_BET_AMOUNT)}
          addMatch={addMatch} />}
        {page === Page.ended && <EndedMatchesPage matches={ended} />}
        {page === Page.betters && <BettersPage onUpdateAmount={onUpdateAmount} betters={betters} onAdd={(name: string) => setBetters((cur: Better[]) => ([...cur, { name, amount: 0, history: [] }]))} />}
      </Grid>
      <Navigation page={page} setPage={setPage} hasEndedMatches={ended.length > 0} />
    </>
  )
}

