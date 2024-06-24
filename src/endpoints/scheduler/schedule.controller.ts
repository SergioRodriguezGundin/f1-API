import { Context } from 'hono';
import { ScheduleDAO } from '../../db/schedule/schedule-DAO';

export class ScheduleController {
  static async getSchedule(c: Context) {
    const scheduleDAO = ScheduleDAO.getInstance(c.env);
    const schedule = await scheduleDAO.getSchedule();
    return c.json(schedule);
  }
}