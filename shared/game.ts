export interface IGame {
    board : Array<Array<state>>
    amountOfLife: number
}

export enum state
{
    unpopulated = 0,
    populated = 1
}