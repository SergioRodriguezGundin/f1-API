import { ISchedule } from '@gunsrf1/api-contracts/src/scheduler/scheduler.interface';

export interface ScheduleDAOInterface {
  getSchedule(year: string): Promise<ISchedule[]>;
  getNextRaces(year: string): Promise<ISchedule[]>;
  getCurrentRace(year: string): Promise<ISchedule>;
}
