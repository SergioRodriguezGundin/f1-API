import { Schedule } from '../../xata';

export interface ScheduleDB extends Schedule {}

export interface ScheduleDAOInterface {
  getSchedule(year: string): Promise<ScheduleDB[]>;
  getNextRaces(year: string): Promise<ScheduleDB[]>;
  getCurrentRace(year: string): Promise<ScheduleDB>;
}
