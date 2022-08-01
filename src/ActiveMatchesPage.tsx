import React from "react"
import { CreateMatchCard } from "./CreateMatchCard";
import { MatchCard } from "./MatchCard";
import { Better, Match } from "./types";

interface ActiveMatchesPageProps {
  matches: Match[],
  setMatches: (matches: Match[]) => void,
  addMatch: (contestants: string[]) => void,
  allBetters: Better[]
  registerBet: (matchId: string) => (contestant: string) => (better: string) => void
}

export const ActiveMatchesPage = ({ matches, setMatches, addMatch, allBetters, registerBet }: ActiveMatchesPageProps) => {
  return (
    <>
      <CreateMatchCard addMatch={addMatch} />
      {matches.map((match, index) =>
        <MatchCard
          key={index}
          match={match}
          allBetters={allBetters}
          registerBet={registerBet(match.id)}
          setMatch={(newMatch) => {
            setMatches(matches.map(match => match.id === newMatch.id ? newMatch : match))
          }} />
      )}
    </>
  )
}