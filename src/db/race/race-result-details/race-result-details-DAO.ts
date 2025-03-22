import { IRaceResultDetails } from '@gunsrf1/api-contracts/src/race/race-result-details/race-result-details.interface';
import { TRPCError } from '@trpc/server';
import { DBXataClient } from '../../xata-client';
import { RaceResultDetailsDAO as RaceResultDetailsDAOInterface } from './race-result-details-DAO.interface';

export class RaceResultDetailsDAO implements RaceResultDetailsDAOInterface {
  private static instance: RaceResultDetailsDAO;
  private readonly databaseClient: DBXataClient;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
  }

  static getInstance(env: Env): RaceResultDetailsDAO {
    if (!RaceResultDetailsDAO.instance) {
      RaceResultDetailsDAO.instance = new RaceResultDetailsDAO(env);
    }
    return RaceResultDetailsDAO.instance;
  }

  async getRaceResultDetails(year: string, racePlace: string): Promise<IRaceResultDetails[]> {
    try {
      const raceResultDetails = await this.databaseClient
        .getClient()
        .db.Race_result.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .getAll({
          filter: { year: parseInt(year), place: racePlace },
        });
      return raceResultDetails as unknown as IRaceResultDetails[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting race result details for year ${year} and race place ${racePlace}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }
}
