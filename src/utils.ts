import { Match } from "./types"
import { uniq } from 'lodash';

export const randomId = () => Math.round(Math.random() * 100000000)

export const defaultMatch: Match = { id: randomId(), first: 'Peter', second: 'Torsten', betsFirst: ['Theresa'], betsSecond: [], phase: 'betting' }

export const getBetters = (matches: Match[]) => uniq(matches.reduce((acc, cur): string[] => {
    const bettersOfMatch = [...cur.betsFirst, ...cur.betsSecond]
    return [...acc, ...bettersOfMatch]
}, [] as string[]))