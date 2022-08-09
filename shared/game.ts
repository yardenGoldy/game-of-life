export interface IGame {
    board : Array<Array<state>>
}

export enum state
{
    unpopulated = 0,
    populated = 1
}