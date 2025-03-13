import { ISprintRace } from '@gunsrf1/api-contracts/src/sprint/sprint-race/sprint-race.interface';

export interface SprintRaceDAOInterface {
  getSprintRace(year: string, racePlace: string): Promise<ISprintRace[]>;
}
