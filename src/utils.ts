import { Match } from "./types"

export const randomId = () => Math.round(Math.random() * 100000000)

export const defaultMatch: Match = {id: randomId(),first: 'Peter', second: 'Torsten', betsFirst: ['Theresa'], betsSecond: [], phase: 'betting'}
