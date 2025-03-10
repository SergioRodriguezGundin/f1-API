import { RaceStartingGridDAOInterface } from './race-starting-grid-DAO.interface';
import { DBXataClient } from '../../xata-client';
import { IRaceStartingGrid } from '@gunsrf1/api-contracts/src/race/race-starting-grid/race-starting-grid.interface';

export class RaceStartingGridDAO implements RaceStartingGridDAOInterface {
  private static instance: RaceStartingGridDAO;
  private readonly databaseClient: DBXataClient;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
  }

  static getInstance(env: Env): RaceStartingGridDAO {
    if (!RaceStartingGridDAO.instance) {
      RaceStartingGridDAO.instance = new RaceStartingGridDAO(env);
    }
    return RaceStartingGridDAO.instance;
  }

  async getRaceStartingGrid(year: string, racePlace: string): Promise<IRaceStartingGrid[]> {
    const raceStartingGrid = await this.databaseClient.getClient().db.Race_starting_grid.getFirst({
      filter: { year, place: racePlace },
    });
    return raceStartingGrid as unknown as IRaceStartingGrid[];
  }
}
