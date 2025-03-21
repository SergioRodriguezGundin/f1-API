import { DBXataClient } from '../../xata-client';
import { RacePracticeDAOInterface } from './race-practice-DAO.interface';
import { IRacePractice } from '@gunsrf1/api-contracts/src/race/race-practice/race-practice.interface';
import { TRPCError } from '@trpc/server';

export class RacePracticeDAO implements RacePracticeDAOInterface {
  private static instance: RacePracticeDAO;
  private readonly databaseClient: DBXataClient;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
  }

  static getInstance(env: Env): RacePracticeDAO {
    if (!RacePracticeDAO.instance) {
      RacePracticeDAO.instance = new RacePracticeDAO(env);
    }
    return RacePracticeDAO.instance;
  }

  async getRacePractice(year: string, racePlace: string): Promise<IRacePractice[]> {
    try {
      const racePractice = await this.databaseClient
        .getClient()
        .db.Race_practice.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .sort('position', 'asc')
        .getAll({
          filter: { year: parseInt(year), place: racePlace },
        });
      return racePractice as unknown as IRacePractice[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting race practice for year ${year} and race place ${racePlace}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }

  async getRacePracticeBySession(year: string, racePlace: string, session: string): Promise<IRacePractice[]> {
    try {
      const racePractice = await this.databaseClient
        .getClient()
        .db.Race_practice.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .sort('position', 'asc')
        .getAll({
          filter: { year: parseInt(year), place: racePlace, session: parseInt(session) },
        });
      return racePractice as unknown as IRacePractice[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting race practice for year ${year}, race place ${racePlace}, and session ${session}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }
}
