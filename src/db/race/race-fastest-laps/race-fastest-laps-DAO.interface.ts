import { IRaceFastestLaps } from '@gunsrf1/api-contracts/src/race/race-fastest-laps/race-fastest-laps.interface';

export interface RaceFastestLapsDAOInterface {
  getRaceFastestLaps(year: string, racePlace: string): Promise<IRaceFastestLaps[]>;
}
