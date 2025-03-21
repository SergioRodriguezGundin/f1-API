import { DBXataClient } from '../../xata-client';
import { SprintRaceDAOInterface } from './sprint-race-DAO.interface';
import { ISprintRace } from '@gunsrf1/api-contracts/src/sprint/sprint-race/sprint-race.interface';
import { TRPCError } from '@trpc/server';

export class SprintRaceDAO implements SprintRaceDAOInterface {
  private static instance: SprintRaceDAO;
  private readonly databaseClient: DBXataClient;
  private readonly env: Env;

  constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
    this.env = env;
  }

  public static getInstance(env: Env) {
    if (!SprintRaceDAO.instance) {
      SprintRaceDAO.instance = new SprintRaceDAO(env);
    }
    return SprintRaceDAO.instance;
  }

  async getSprintRace(year: string, racePlace: string): Promise<ISprintRace[]> {
    try {
      const cachedSprintRace = await this.env.F1_CACHE.get(`sprint-race-${year}-${racePlace}`, 'json');

      if (cachedSprintRace) {
        return cachedSprintRace as ISprintRace[];
      }

      const sprintRace = await this.databaseClient
        .getClient()
        .db.Sprint_race.select(['*', 'driver.id', 'driver.name', 'driver.image', 'team.id', 'team.name', 'team.icon'])
        .filter({ year: parseInt(year), place: racePlace })
        .sort('position', 'asc')
        .getAll();

      await this.env.F1_CACHE.put(`sprint-race-${year}-${racePlace}`, JSON.stringify(sprintRace));

      return sprintRace as unknown as ISprintRace[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting sprint race for year ${year} and race place ${racePlace}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      });
    }
  }
}
