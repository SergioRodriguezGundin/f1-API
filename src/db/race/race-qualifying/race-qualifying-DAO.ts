import { IRaceQualifying } from '@gunsrf1/api-contracts/src/race/race-qualifying/race-qualifying.interface';
import { TRPCError } from '@trpc/server';
import { DBXataClient } from '../../xata-client';
import { RaceQualifyingDAOInterface } from './race-qualifying-DAO.interface';

export class RaceQualifyingDAO implements RaceQualifyingDAOInterface {
  private static instance: RaceQualifyingDAO;
  private readonly databaseClient: DBXataClient;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
  }

  static getInstance(env: Env): RaceQualifyingDAO {
    if (!RaceQualifyingDAO.instance) {
      RaceQualifyingDAO.instance = new RaceQualifyingDAO(env);
    }
    return RaceQualifyingDAO.instance;
  }

  async getRaceQualifying(year: string, place: string): Promise<IRaceQualifying[]> {
    try {
      const raceQualifying = await this.databaseClient
        .getClient()
        .db.Race_qualifying.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .sort('position', 'asc')
        .getAll({
          filter: { year: parseInt(year), place },
        });
      return raceQualifying as unknown as IRaceQualifying[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting race qualifying for year ${year} and place ${place}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }
}
