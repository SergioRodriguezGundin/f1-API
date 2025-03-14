import { ISprintQualifying } from '@gunsrf1/api-contracts/dist/sprint/sprint-qualifying/sprint-qualifying.interface';

export interface SprintQualifyingDAOInterface {
  getSprintQualifying(year: string, racePlace: string): Promise<ISprintQualifying[]>;
}
