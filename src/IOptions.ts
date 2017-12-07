export interface IOptions {
    network: [number, number[], number];
    population: number;
    elitism: number;
    randomBehaviour: number;
    mutationRate: number;
    mutationRange: number;
    historic: number;
    lowHistoric: boolean;
    scoreSort: -1 | 1;
    nbChild: number;
}