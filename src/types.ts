export interface Match {
    phase: 'betting' | 'fighting' | 'ended',
    first: string,
    second: string,
    betsFirst: string[],
    betsSecond: string[],
    id: number,
    winner?: string
}

export enum Page {
    active = 'ACTIVE',
    ended = 'ENDED',
    betters = 'BETTERS'
}

export interface Better { amount: number, matches: string[], name: string }
