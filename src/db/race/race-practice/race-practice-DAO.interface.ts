import { IRacePractice } from '@gunsrf1/api-contracts/src/race/race-practice/race-practice.interface';

export interface RacePracticeDAOInterface {
  getRacePractice(year: string, racePlace: string): Promise<IRacePractice[]>;
  getRacePracticeBySession(year: string, racePlace: string, session: string): Promise<IRacePractice[]>;
}
