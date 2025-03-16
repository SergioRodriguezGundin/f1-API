import { ISprintGrid } from '@gunsrf1/api-contracts/dist/sprint/sprint-grid/sprint-grid.interface';
import { DBXataClient } from '../../xata-client';
import { SprintGridDAOInterface } from './sprint-grid-DAO.interface';

export class SprintGridDAO implements SprintGridDAOInterface {
  private static instance: SprintGridDAO;
  private readonly databaseClient: DBXataClient;
  private readonly env: Env;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
    this.env = env;
  }

  public static getInstance(env: Env) {
    if (!SprintGridDAO.instance) {
      SprintGridDAO.instance = new SprintGridDAO(env);
    }
    return SprintGridDAO.instance;
  }

  async getSprintGrid(year: string, racePlace: string): Promise<ISprintGrid[]> {
    const cachedSprintGrid = await this.env.F1_CACHE.get(`sprint-grid-${year}-${racePlace}`, 'json');

    if (cachedSprintGrid) {
      return cachedSprintGrid as ISprintGrid[];
    }

    const sprintGrid = await this.databaseClient
      .getClient()
      .db.Sprint_grid.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
      .filter({ year: parseInt(year), place: racePlace })
      .sort('position', 'asc')
      .getAll();

    await this.env.F1_CACHE.put(`sprint-grid-${year}-${racePlace}`, JSON.stringify(sprintGrid));

    return sprintGrid as unknown as ISprintGrid[];
  }
}
