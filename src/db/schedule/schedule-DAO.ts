import { DBXataClient } from '../xata-client';
import { ScheduleDAOInterface, ScheduleDB } from './schedule-DAO.interface';

interface ScheduleDate {
	startMonth: number;
	endMonth: number;
	startDay: number;
	endDay: number;
}

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

	public async getSchedule(year: string): Promise<ScheduleDB[]> {
		const cachedSchedule = await this.env.F1_CACHE.get(`schedule-${year}`, 'json');

		if (cachedSchedule) {
			return cachedSchedule as ScheduleDB[];
		}

		const schedule = await this.databaseClient.getClient().db.Schedule.getAll();
		const scheduleOrdered = this.orderRacesByDate(schedule);

		await this.env.F1_CACHE.put(`schedule-${year}`, JSON.stringify(scheduleOrdered));

		return scheduleOrdered as ScheduleDB[];
	}

	public async getNextRaces(year: string): Promise<ScheduleDB[]> {
		const currentDate = new Date();
		let schedule: ScheduleDB[] = [];
		schedule = (await this.env.F1_CACHE.get(`schedule-${year}`, 'json')) as ScheduleDB[];

		if (!schedule) {
			schedule = await this.databaseClient.getClient().db.Schedule.getAll();
		}

		const nextRaces = this.orderRacesByDate(schedule).filter((race) => (race.date as Date) >= currentDate);
		await this.env.F1_CACHE.put(`next-races-${year}`, JSON.stringify(nextRaces));

		return nextRaces.slice(1, nextRaces.length - 1);
	}

	public async getCurrentRace(year: string): Promise<ScheduleDB> {
		const currentDate = new Date();
		let schedule: ScheduleDB[] = [];
		schedule = (await this.env.F1_CACHE.get(`schedule-${year}`, 'json')) as ScheduleDB[];

		if (!schedule) {
			schedule = await this.databaseClient.getClient().db.Schedule.getAll();
		}

		const nextRace = this.orderRacesByDate(schedule).find((race) => (race.date as Date) >= currentDate);
		await this.env.F1_CACHE.put(`current-race-${year}`, JSON.stringify(nextRace));

		return nextRace as ScheduleDB;
	}

	private orderRacesByDate(races: ScheduleDB[]): ScheduleDB[] {
		return races.sort((a, b) => (a.date as Date).getTime() - (b.date as Date).getTime());
	}
}
