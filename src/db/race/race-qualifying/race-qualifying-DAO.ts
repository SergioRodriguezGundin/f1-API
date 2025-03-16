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

  async getRaceQualifying(year: string, place: string): Promise<IRaceQualifying[]> {
    const raceQualifying = await this.databaseClient
      .getClient()
      .db.Race_qualifying.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
      .sort('position', 'asc')
      .getAll({
        filter: { year: parseInt(year), place },
      });
    return raceQualifying as unknown as IRaceQualifying[];
  }
}
