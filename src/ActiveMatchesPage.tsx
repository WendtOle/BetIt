import React from "react"
import { CreateMatchCard } from "./CreateMatchCard";
import { MatchCard } from "./MatchCard";
import { Better, Match } from "./types";

interface ActiveMatchesPageProps {
  matches: Match[],
  addMatch: (contestants: string[]) => void,
  allBetters: Better[]
  registerBet: (matchId: string) => (contestant: string) => (better: string) => void,
  removeBet: (matchId: string) => (contestant: string) => (better: string) => void,
  closeMatch: (matchId: string) => (winner: string) => void
  stopBettingOnMatch: (matchId: string) => void;
}

export const ActiveMatchesPage = ({ matches, stopBettingOnMatch, removeBet, addMatch, closeMatch, allBetters, registerBet }: ActiveMatchesPageProps) => {
  return (
    <>
      <CreateMatchCard addMatch={addMatch} />
      {matches.map((match, index) =>
        <MatchCard
          key={index}
          match={match}
          allBetters={allBetters}
          registerBet={registerBet(match.id)}
          removeBet={removeBet(match.id)}
          closeMatch={closeMatch(match.id)}
          stopBettingOnMatch={() => stopBettingOnMatch(match.id)}
          />
      )}
    </>
  )
}