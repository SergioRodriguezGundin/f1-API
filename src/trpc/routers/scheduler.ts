import { router } from '..';
import { z } from 'zod';
import { ScheduleDAO } from '../../db/schedule/schedule-DAO';
import { publicProcedure } from '..';
import { TRPCError } from '@trpc/server';

export const schedulerRouter = router({
  getSchedule: publicProcedure
    .input(z.object({ year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number') }))
    .query(async ({ input, ctx }) => {
      try {
        const scheduleDAO = ScheduleDAO.getInstance(ctx.env);
        const schedule = await scheduleDAO.getSchedule(input.year);

        if (!schedule || schedule.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No schedule found for year ${input.year}`,
          });
        }

        return schedule;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get schedule',
        });
      }
    }),
  getNextRaces: publicProcedure
    .input(z.object({ year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number') }))
    .query(async ({ input, ctx }) => {
      try {
        const scheduleDAO = ScheduleDAO.getInstance(ctx.env);
        const schedule = await scheduleDAO.getNextRaces(input.year);

        return schedule;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get next races',
        });
      }
    }),
  getCurrentRace: publicProcedure
    .input(z.object({ year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number') }))
    .query(async ({ input, ctx }) => {
      try {
        const scheduleDAO = ScheduleDAO.getInstance(ctx.env);
        const schedule = await scheduleDAO.getCurrentRace(input.year);

        return schedule;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get current race',
        });
      }
    }),
});
