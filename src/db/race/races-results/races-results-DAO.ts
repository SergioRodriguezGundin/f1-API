import { DBXataClient } from '../../xata-client';
import { RacesResulstDAOInterface } from './races-results-DAO.interface';
import { IRacesResults } from '@gunsrf1/api-contracts/src/races/races-results/races-results.interface';
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
    const cachedRacesResults = await this.env.F1_CACHE.get('races-results');

    if (cachedRacesResults) {
      return JSON.parse(cachedRacesResults);
    }

    const racesResults = await this.databaseClient
      .getClient()
      .db.Races_result.select(['*', 'team.id', 'team.id', 'team.name', 'team.icon', 'winner.id', 'winner.name', 'winner.image'])
      .filter({ year: parseInt(year) })
      .getAll();

    await this.env.F1_CACHE.put('races-results', JSON.stringify(racesResults));

    return racesResults as unknown as IRacesResults[];
  }

  getRacesResultById(id: number): Promise<IRacesResults> {
    throw new Error('Method not implemented.');
  }
}
