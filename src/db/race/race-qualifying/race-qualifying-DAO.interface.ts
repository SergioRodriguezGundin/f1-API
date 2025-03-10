import { IRaceQualifying } from '@gunsrf1/api-contracts/src/race/race-qualifying/race-qualifying.interface';

export interface RaceQualifyingDAOInterface {
  getRaceQualifying(place: string, year: string): Promise<IRaceQualifying[]>;
}
