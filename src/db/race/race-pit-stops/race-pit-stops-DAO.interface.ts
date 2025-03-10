import { IRacePitStops } from '@gunsrf1/api-contracts/src/race/race-pit-stops/race-pitstops.interface';

export interface RacePitStopsDAOInterface {
  getRacePitStops(year: string, racePlace: string): Promise<IRacePitStops[]>;
}
