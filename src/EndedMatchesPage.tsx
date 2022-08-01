import React from "react"
import { MatchCard } from "./MatchCard";
import { Match } from "./types";

interface EndedMatchesPageProps {
    matches: Match[],
}

export const EndedMatchesPage = ({ matches }: EndedMatchesPageProps) => {
    return (
        <>
            {matches.map((match, index) => <MatchCard key={index} match={match} />)}
        </>
    )
}