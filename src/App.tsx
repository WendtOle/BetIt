import { Grid } from "@mui/material"
import React, { ReactElement, useState } from "react"
import { ActiveMatchesPage } from "./ActiveMatchesPage";
import { EndedMatchesPage } from "./EndedMatchesPage";
import { Navigation } from "./Navigation";
import { Match, Page } from "./types";
import { defaultMatch, randomId } from './utils';

export const App = (): ReactElement => {
  const [matches, setMatches] = useState<Match[]>([defaultMatch])
  const [page, setPage] = useState<Page>(Page.active)

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

  return (
    <>
      <Grid container spacing={2}>
        {page === Page.active && <ActiveMatchesPage
          matches={active}
          setMatches={setMatches}
          addMatch={addMatch} />}
        {page === Page.ended && <EndedMatchesPage matches={ended} />}
      </Grid>
      <Navigation page={page} setPage={setPage} hasEndedMatches={ended.length > 0} />

    </>
  )
}

