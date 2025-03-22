import { ISchedule } from '@gunsrf1/api-contracts/src/scheduler/scheduler.interface';
import { TRPCError } from '@trpc/server';
import { DBXataClient } from '../xata-client';
import { ScheduleDAOInterface } from './schedule-DAO.interface';

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
      ScheduleDAO.instance = new ScheduleDAO(env);
    }
    return ScheduleDAO.instance;
  }

  public async getSchedule(year: string): Promise<ISchedule[]> {
    try {
      const cachedSchedule = await this.env.F1_CACHE.get(`schedule-${year}`, 'json');

      if (cachedSchedule) {
        return cachedSchedule as ISchedule[];
      }

      const schedule = (await this.databaseClient.getClient().db.Schedule.getAll()) as unknown as ISchedule[];
      const scheduleOrdered = this.orderRacesByDate(schedule);

      await this.env.F1_CACHE.put(`schedule-${year}`, JSON.stringify(scheduleOrdered));

      return scheduleOrdered;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting schedule for year ${year}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  public async getNextRaces(year: string): Promise<ISchedule[]> {
    try {
      const currentDate = new Date();
      let schedule: ISchedule[] = [];
      schedule = (await this.env.F1_CACHE.get(`schedule-${year}`, 'json')) as ISchedule[];

      if (!schedule) {
        schedule = (await this.databaseClient.getClient().db.Schedule.getAll()) as unknown as ISchedule[];
      }

      const nextRaces = this.orderRacesByDate(schedule).filter((race) => new Date(race.date) >= currentDate);
      await this.env.F1_CACHE.put(`next-races-${year}`, JSON.stringify(nextRaces));

      return nextRaces.slice(1, nextRaces.length - 1);
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting next races for year ${year}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  public async getCurrentRace(year: string): Promise<ISchedule> {
    try {
      const currentDate = new Date();
      let schedule: ISchedule[] = [];
      schedule = (await this.env.F1_CACHE.get(`schedule-${year}`, 'json')) as ISchedule[];

      if (!schedule) {
        schedule = (await this.databaseClient.getClient().db.Schedule.getAll()) as unknown as ISchedule[];
      }

      const nextRace = this.orderRacesByDate(schedule).find((race) => new Date(race.date) >= currentDate);
      await this.env.F1_CACHE.put(`current-race-${year}`, JSON.stringify(nextRace));

      return nextRace as ISchedule;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting current race for year ${year}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  private orderRacesByDate(races: ISchedule[]): ISchedule[] {
    return races.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
