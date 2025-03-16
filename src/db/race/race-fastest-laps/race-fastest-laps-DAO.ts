import { IRaceFastestLaps } from '@gunsrf1/api-contracts/src/race/race-fastest-laps/race-fastest-laps.interface';
import { DBXataClient } from '../../xata-client';
import { RaceFastestLapsDAOInterface } from './race-fastest-laps-DAO.interface';

export class RaceFastestLapsDAO implements RaceFastestLapsDAOInterface {
  private static instance: RaceFastestLapsDAO;
  private readonly databaseClient: DBXataClient;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
  }

  static getInstance(env: Env): RaceFastestLapsDAO {
    if (!RaceFastestLapsDAO.instance) {
      RaceFastestLapsDAO.instance = new RaceFastestLapsDAO(env);
    }
    return RaceFastestLapsDAO.instance;
  }

  async getRaceFastestLaps(year: string, racePlace: string): Promise<IRaceFastestLaps[]> {
    const raceFastestLaps = await this.databaseClient
      .getClient()
      .db.Race_fastest_laps.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
      .sort('lap', 'asc')
      .getAll({ filter: { year: parseInt(year), place: racePlace } });
    return raceFastestLaps as unknown as IRaceFastestLaps[];
  }
}
