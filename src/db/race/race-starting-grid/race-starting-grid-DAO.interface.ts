import { IRaceStartingGrid } from '@gunsrf1/api-contracts/src/race/race-starting-grid/race-starting-grid.interface';

export interface RaceStartingGridDAOInterface {
  getRaceStartingGrid(year: string, racePlace: string): Promise<IRaceStartingGrid[]>;
}
