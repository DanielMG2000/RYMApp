import { character } from './character.model';

export interface apiData{
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string
    },
    results: character[]
}