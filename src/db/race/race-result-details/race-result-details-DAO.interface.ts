import { IRaceResultDetails } from '@gunsrf1/api-contracts/src/race/race-result-details/race-result-details.interface';

export interface RaceResultDetailsDAO {
  getRaceResultDetails(year: string, racePlace: string): Promise<IRaceResultDetails[]>;
}
