import { RacesResult } from '../../../xata';

export interface RacesResultsDB extends RacesResult {}

export interface RacesResulstDAOInterface {
  getRacesResults(year: string): Promise<RacesResultsDB[]>;
}
