import { IRacesResults } from '@gunsrf1/api-contracts/src/races/races-results/races-results.interface';

export interface RacesResulstDAOInterface {
  getRacesResults(year: string): Promise<IRacesResults[]>;
}
