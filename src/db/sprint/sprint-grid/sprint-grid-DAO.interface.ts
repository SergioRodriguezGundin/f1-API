import { ISprintGrid } from '@gunsrf1/api-contracts/dist/sprint/sprint-grid/sprint-grid.interface';

export interface SprintGridDAOInterface {
  getSprintGrid(year: string, racePlace: string): Promise<ISprintGrid[]>;
}
