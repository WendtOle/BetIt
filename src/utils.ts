import { Match } from "./types"
import { uniq } from 'lodash';

export const randomId = (): string => Math.round(Math.random() * 100000000) + ''

export const getBetters = (matches: Match[]) => uniq(matches.reduce((acc, cur): string[] => {
    const bettersOfMatch = [...cur.betsFirst, ...cur.betsSecond]
    return [...acc, ...bettersOfMatch]
}, [] as string[]))