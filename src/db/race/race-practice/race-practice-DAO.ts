import { DBXataClient } from '../../xata-client';
import { RacePracticeDAOInterface } from './race-practice-DAO.interface';
import { IRacePractice } from '@gunsrf1/api-contracts/src/race/race-practice/race-practice.interface';

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
    const racePractice = await this.databaseClient
      .getClient()
      .db.Race_practice.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
      .getFirst({
        filter: { year, place: racePlace },
      });
    return racePractice as unknown as IRacePractice[];
  }
}
