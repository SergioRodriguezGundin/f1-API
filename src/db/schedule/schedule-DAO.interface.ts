import { Schedule } from '../../xata';

export interface ScheduleDB extends Schedule {}

export interface ScheduleDAOInterface {
	getSchedule(): Promise<ScheduleDB[]>;
	getNextRaces(): Promise<ScheduleDB[]>;
	getCurrentRace(): Promise<ScheduleDB>;
}
