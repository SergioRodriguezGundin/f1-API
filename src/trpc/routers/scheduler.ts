import { ScheduleDAO } from '../../db/schedule/schedule-DAO';
import { TRPCError } from '@trpc/server';

export const schedulerRouterImpl = (env: Env) => {
  return {
    getSchedule: async (year: string) => {
      const scheduleDAO = ScheduleDAO.getInstance(env);
      const schedule = await scheduleDAO.getSchedule(year);

      if (!schedule || schedule.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No schedule found for year ${year}`,
        });
      }

      return schedule;
    },
    getNextRaces: async (year: string) => {
      try {
        const scheduleDAO = ScheduleDAO.getInstance(env);
        const schedule = await scheduleDAO.getNextRaces(year);

        return schedule;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get next races',
          cause: error,
        });
      }
    },
    getCurrentRace: async (year: string) => {
      try {
        const scheduleDAO = ScheduleDAO.getInstance(env);
        const schedule = await scheduleDAO.getCurrentRace(year);

        return schedule;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get current race',
          cause: error,
        });
      }
    },
  };
};
