import { IRacePitStops } from '@gunsrf1/api-contracts/src/race/race-pit-stops/race-pitstops.interface';
import { TRPCError } from '@trpc/server';
import { DBXataClient } from '../../xata-client';
import { RacePitStopsDAOInterface } from './race-pit-stops-DAO.interface';

export class RacePitStopsDAO implements RacePitStopsDAOInterface {
  private static instance: RacePitStopsDAO;
  private readonly databaseClient: DBXataClient;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
  }

  static getInstance(env: Env): RacePitStopsDAO {
    if (!RacePitStopsDAO.instance) {
      RacePitStopsDAO.instance = new RacePitStopsDAO(env);
    }
    return RacePitStopsDAO.instance;
  }

  async getRacePitStops(year: string, racePlace: string): Promise<IRacePitStops[]> {
    try {
      const racePitStops = await this.databaseClient
        .getClient()
        .db.Race_pit_stops.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .sort('lap', 'asc')
        .getAll({ filter: { year: parseInt(year), place: racePlace } });
      return racePitStops as unknown as IRacePitStops[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting race pit stops for year ${year} and race place ${racePlace}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }
}
