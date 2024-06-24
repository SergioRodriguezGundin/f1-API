import { DBXataClient } from '../xata-client';
import { ScheduleDAOInterface, ScheduleDB } from './schedule-DAO.interface';

export class ScheduleDAO implements ScheduleDAOInterface {
  private static instance: ScheduleDAO;
  private readonly databaseClient: DBXataClient;
  private readonly env: Env;

  private constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
    this.env = env;
  }

  public static getInstance(env: Env) {
    if (!ScheduleDAO.instance) {
      ScheduleDAO.instance = new ScheduleDAO(env)
    }
    return ScheduleDAO.instance
  }

  public async getSchedule(): Promise<ScheduleDB[]> {
    const cachedSchedule = await this.env.F1_CACHE.get('schedule', 'json');

    if (cachedSchedule) {
      return cachedSchedule as ScheduleDB[];
    }

    const schedule = await this.databaseClient.getClient().db.Schedule.getAll();

    await this.env.F1_CACHE.put('schedule', JSON.stringify(schedule));

    return schedule as ScheduleDB[];
  }
}