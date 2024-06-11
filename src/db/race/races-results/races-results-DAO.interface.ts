import { RacesResult } from "../../../xata";

export interface RacesResultsDB extends RacesResult { }

export interface RacesResulstDAOInterface {
  getRacesResults(): Promise<RacesResultsDB[]>;
  getRacesResultById(id: number): Promise<RacesResultsDB>;
}

