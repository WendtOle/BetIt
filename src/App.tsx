import { Grid } from "@mui/material"
import React, { ReactElement, useState } from "react"
import { ActiveMatchesPage } from "./ActiveMatchesPage";
import { BettersPage } from "./BettersPage";
import { EndedMatchesPage } from "./EndedMatchesPage";
import { Navigation } from "./Navigation";
import { Better, Match, Page } from "./types";
import { defaultMatch, randomId, getBetters } from './utils';

export const App = (): ReactElement => {
  const [matches, setMatches] = useState<Match[]>([defaultMatch])
  const [page, setPage] = useState<Page>(Page.active)
  const [betters, setBetters] = useState<Better[]>([])

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

  const onUpdateAmount = (name: string) => (amount: number) => {
    setBetters(cur => {
      return cur.map(better => {
        if (better.name !== name) {
          return better
        }
        return { ...better, amount: better.amount + amount }
      })
    })
  }

  return (
    <>
      <Grid container spacing={2} style={{ marginBottom: 62 }}>
        {page === Page.active && <ActiveMatchesPage
          matches={active}
          setMatches={setMatches}
          allBetters={getBetters(matches)}
          addMatch={addMatch} />}
        {page === Page.ended && <EndedMatchesPage matches={ended} />}
        {page === Page.betters && <BettersPage onUpdateAmount={onUpdateAmount} betters={betters} onAdd={(name: string) => setBetters((cur: Better[]) => ([...cur, { name, amount: 0, matches: [] }]))} />}
      </Grid>
      <Navigation page={page} setPage={setPage} hasEndedMatches={ended.length > 0} />
    </>
  )
}

