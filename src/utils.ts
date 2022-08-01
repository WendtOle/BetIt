import { Better, Match } from "./types"
import { uniq } from 'lodash';

export const randomId = (): string => Math.round(Math.random() * 100000000) + ''

export const defaultMatch: Match = { id: randomId(), first: 'Peter', second: 'Torsten', betsFirst: ['Jakub'], betsSecond: [], phase: 'betting' }
export const defaultBetters: Better[] = [{name: 'Jakub', amount: 10, history: ['initial load']}, {name: 'Johannes', amount: 7, history: ['initial load']},{name: 'Xenia', amount: 3, history: ['initial load']}]

export const getBetters = (matches: Match[]) => uniq(matches.reduce((acc, cur): string[] => {
    const bettersOfMatch = [...cur.betsFirst, ...cur.betsSecond]
    return [...acc, ...bettersOfMatch]
}, [] as string[]))