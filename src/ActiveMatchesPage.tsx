import React from "react"
import { CreateMatchCard } from "./CreateMatchCard";
import { MatchCard } from "./MatchCard";
import { Match } from "./types";

interface ActiveMatchesPageProps {
    matches: Match[],
    setMatches: (matches: Match[]) => void,
    addMatch: (contestants: string[]) => void
}

export const ActiveMatchesPage = ({matches, setMatches, addMatch}: ActiveMatchesPageProps) => {
    return (
        <>
        <CreateMatchCard addMatch={addMatch} />
      {matches.map((match, index) =>
        <MatchCard key={index} match={match} setMatch={(newMatch) => {
          setMatches(matches.map(match => match.id === newMatch.id ? newMatch : match))
        }} />
        )}
    </>
    )
}