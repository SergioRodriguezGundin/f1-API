import { DBXataClient } from '../../xata-client';
import { RacesResulstDAOInterface, RacesResultsDB } from "./races-results-DAO.interface";

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

  async getRacesResults(): Promise<RacesResultsDB[]> {
    const cachedRacesResults = await this.env.F1_CACHE.get('races-results');

    if (cachedRacesResults) {
      return JSON.parse(cachedRacesResults);
    }

    const racesResults = await this.databaseClient.getClient().db.Races_result.getAll();

    await this.env.F1_CACHE.put('races-results', JSON.stringify(racesResults));

    return racesResults as RacesResultsDB[];
  }

  getRacesResultById(id: number): Promise<RacesResultsDB> {
    throw new Error('Method not implemented.');
  }
}

