import { DBXataClient } from '../../xata-client';
import { RacesResulstDAOInterface } from './races-results-DAO.interface';
import { IRacesResults } from '@gunsrf1/api-contracts/src/races/races-results/races-results.interface';
import { TRPCError } from '@trpc/server';

export class RacesResultsDAO implements RacesResulstDAOInterface {
  private static instance: RacesResultsDAO;
  private readonly databaseClient: DBXataClient;
  private readonly env: Env;

  private constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
    this.env = env;
  }

  static getInstance(env: Env): RacesResultsDAO {
    if (!RacesResultsDAO.instance) {
      RacesResultsDAO.instance = new RacesResultsDAO(env);
    }
    return RacesResultsDAO.instance;
  }

  async getRacesResults(year: string): Promise<IRacesResults[]> {
    try {
      const cachedRacesResults = await this.env.F1_CACHE.get(`races-results-${year}`);

      if (cachedRacesResults) {
        return JSON.parse(cachedRacesResults);
      }

      const racesResults = await this.databaseClient
        .getClient()
        .db.Races_result.select(['*', 'team.id', 'team.id', 'team.name', 'team.icon', 'winner.id', 'winner.name', 'winner.image'])
        .filter({ year: parseInt(year) })
        .getAll();

      await this.env.F1_CACHE.put(`races-results-${year}`, JSON.stringify(racesResults));

      return racesResults as unknown as IRacesResults[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting races results for year ${year}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  getRacesResultById(id: number): Promise<IRacesResults> {
    throw new TRPCError({
      code: 'NOT_IMPLEMENTED',
      message: 'Method not implemented.',
    });
  }
}
