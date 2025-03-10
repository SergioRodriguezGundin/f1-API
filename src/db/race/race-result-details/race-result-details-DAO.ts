import { IRaceResultDetails } from '@gunsrf1/api-contracts/src/race/race-result-details/race-result-details.interface';
import { DBXataClient } from '../../xata-client';

export class RaceResultDetailsDAO implements RaceResultDetailsDAO {
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
    const raceResultDetails = await this.databaseClient
      .getClient()
      .db.Race_result.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
      .getAll({
        filter: { year: parseInt(year), place: racePlace },
      });
    return raceResultDetails as unknown as IRaceResultDetails[];
  }
}
