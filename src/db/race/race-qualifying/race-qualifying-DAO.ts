import { IRaceQualifying } from '@gunsrf1/api-contracts/src/race/race-qualifying/race-qualifying.interface';
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

  async getRaceQualifying(place: string, year: string): Promise<IRaceQualifying[]> {
    const raceQualifying = await this.databaseClient
      .getClient()
      .db.Race_qualifying.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
      .getFirst({
        filter: { place, year },
      });
    return raceQualifying as unknown as IRaceQualifying[];
  }
}
