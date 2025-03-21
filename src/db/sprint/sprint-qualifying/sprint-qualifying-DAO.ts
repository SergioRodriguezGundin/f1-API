import { ISprintQualifying } from '@gunsrf1/api-contracts/dist/sprint/sprint-qualifying/sprint-qualifying.interface';
import { TRPCError } from '@trpc/server';
import { DBXataClient } from '../../xata-client';
import { SprintQualifyingDAOInterface } from './sprint-qualifying-DAO.interface';

export class SprintQualifyingDAO implements SprintQualifyingDAOInterface {
  private static instance: SprintQualifyingDAO;
  private readonly databaseClient: DBXataClient;
  private readonly env: Env;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
    this.env = env;
  }

  public static getInstance(env: Env) {
    if (!SprintQualifyingDAO.instance) {
      SprintQualifyingDAO.instance = new SprintQualifyingDAO(env);
    }
    return SprintQualifyingDAO.instance;
  }

  async getSprintQualifying(year: string, racePlace: string): Promise<ISprintQualifying[]> {
    try {
      const cachedSprintQualifying = await this.env.F1_CACHE.get(`sprint-qualifying-${year}-${racePlace}`, 'json');

      if (cachedSprintQualifying) {
        return cachedSprintQualifying as ISprintQualifying[];
      }

      const sprintQualifying = await this.databaseClient
        .getClient()
        .db.Sprint_qualifying.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .filter({ year: parseInt(year), place: racePlace })
        .sort('position', 'asc')
        .getAll();

      await this.env.F1_CACHE.put(`sprint-qualifying-${year}-${racePlace}`, JSON.stringify(sprintQualifying));

      return sprintQualifying as unknown as ISprintQualifying[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting sprint qualifying for year ${year} and race place ${racePlace}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }
}
