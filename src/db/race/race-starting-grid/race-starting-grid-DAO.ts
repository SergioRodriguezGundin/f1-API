import { RaceStartingGridDAOInterface } from './race-starting-grid-DAO.interface';
import { DBXataClient } from '../../xata-client';
import { IRaceStartingGrid } from '@gunsrf1/api-contracts/src/race/race-starting-grid/race-starting-grid.interface';
import { TRPCError } from '@trpc/server';

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
    try {
      const raceStartingGrid = await this.databaseClient
        .getClient()
        .db.Race_starting_grid.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .getAll({
          filter: { year: parseInt(year), place: racePlace },
        });
      return raceStartingGrid as unknown as IRaceStartingGrid[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting race starting grid for year ${year} and race place ${racePlace}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }
}
