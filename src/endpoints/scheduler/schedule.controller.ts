import { Context } from 'hono';
import { ScheduleDAO } from '../../db/schedule/schedule-DAO';

export class ScheduleController {
	static async getSchedule(c: Context) {
		const { year } = c.req.param();
		const scheduleDAO = ScheduleDAO.getInstance(c.env);
		const schedule = await scheduleDAO.getSchedule(year);
		return c.json(schedule);
	}

	static async getNextRaces(c: Context) {
		const { year } = c.req.param();
		const scheduleDAO = ScheduleDAO.getInstance(c.env);
		const schedule = await scheduleDAO.getNextRaces(year);
		return c.json(schedule);
	}

	static async getCurrentRace(c: Context) {
		const { year } = c.req.param();
		const scheduleDAO = ScheduleDAO.getInstance(c.env);
		const schedule = await scheduleDAO.getCurrentRace(year);
		return c.json(schedule);
	}
}
