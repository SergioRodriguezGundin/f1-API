import { RaceResult } from '../../../xata';

export interface RaceResultDetailsDB extends RaceResult { }

export interface RaceResultDetailsDAO {
  getRaceResultDetails(racePlace: string): Promise<RaceResultDetailsDB[]>;
}