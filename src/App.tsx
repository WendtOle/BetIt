import { AppBar, Grid, Typography } from '@mui/material';
import React, { ReactElement, useState,useEffect } from "react"
import { ActiveMatchesPage } from "./ActiveMatchesPage";
import { BettersPage } from "./BettersPage";
import { EndedMatchesPage } from "./EndedMatchesPage";
import { Navigation } from "./Navigation";
import { SettingsPage } from './SettingsPage';
import { Better, Match, Page } from "./types";
import { randomId} from './utils';

export const DEFAULT_BET_AMOUNT = 1

export const BETTER_KEY = 'better'
export const MATCHES_KEY = 'matches'

export const App = (): ReactElement => {
  const [matches, setMatches] = useState<Match[]>(JSON.parse(localStorage.getItem(MATCHES_KEY) ?? '[]'))
  const [page, setPage] = useState<Page>(Page.active)
  const [betters, setBetters] = useState<Better[]>(JSON.parse(localStorage.getItem(BETTER_KEY) ?? '[]'))

  useEffect(() => {
    localStorage.setItem(MATCHES_KEY,JSON.stringify(matches))
  }, [matches])

  useEffect(() => {
    localStorage.setItem(BETTER_KEY,JSON.stringify(betters))
  }, [betters])

  const initData = () => {
    setMatches([])
    setBetters([])
  }

  const resetTournament = () => {
    setMatches([])
    setBetters((cur) => cur.map(better => ({...better, history: [], amount: 0})))
  }

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

  const stopBettingOnMatch = (matchId: string) => {
    setMatches(cur => {
      return cur.map(match => {
        if (match.id !== matchId) {
          return match
        }
        const {betsFirst, betsSecond, first, second} = match
        if (betsFirst.length === 0) {
          betsSecond.forEach(better => removeBet(match.id)(second)(better, 'no opponents'))
          return {...match, betsSecond: [], phase:'fighting'}
        }
        if (betsSecond.length === 0) {
          betsFirst.forEach(better => removeBet(match.id)(first)(better, 'no opponents'))
          return {...match, betsFirst: [], phase:'fighting'}
        }
        return { ...match, phase: 'fighting'}
      })
    })
  } 

  const resetAccount = (name: string) => {
    setBetters(cur => {
      return cur.map(better => {
        if (better.name !== name) {
          return better
        }
        return { ...better, amount: 0, history: [...better.history, 'account reseted'] }
      })
    })
  }

  const addToAccount = (name: string) => (amount: number, message: string) => {
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
    addToAccount(better)(-DEFAULT_BET_AMOUNT, `(-1) bet on "${contestant}" in match "${matchId}"`)
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

  const removeBet = (matchId: string) => (contestant: string) => (better: string, message?: string) => {
    addToAccount(better)(DEFAULT_BET_AMOUNT, `(+1) removed bet on "${contestant}" in match "${matchId}" ` + (message ?? ''))
    setMatches(cur => cur.map(match => {
      if (match.id !== matchId) {
        return match
      }
      return {
        ...match,
        betsFirst: match.betsFirst.filter(cur => cur !== better),
        betsSecond: match.betsSecond.filter(cur => cur !== better),
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
      addToAccount(betWinner)(winning, `(+${winning}) - won bet in match ${matchId} with winning "${winner}"`)
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
          registerBet={registerBet}
          removeBet={removeBet}
          closeMatch={closeMatch}
          allBetters={betters}
          stopBettingOnMatch={stopBettingOnMatch}
          addMatch={addMatch} />}
        {page === Page.ended && <EndedMatchesPage matches={ended} />}
        {page === Page.settings && <SettingsPage initData={initData} resetTournament={resetTournament}/>}
        {page === Page.betters && <BettersPage 
          addToAccount={addToAccount} 
          resetAccount={resetAccount}
          betters={betters} 
          onAdd={(name: string) => setBetters((cur: Better[]) => ([...cur, { name, amount: 0, history: [] }]))} />}
      </Grid>
      <Navigation page={page} setPage={setPage} hasEndedMatches={ended.length > 0} />
    </>
  )
}

