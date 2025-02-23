import { router } from '../..';
import { z } from 'zod';
import { publicProcedure } from '../..';
import { RaceResultDetailsDAO } from '../../../db/race/race-result-details/race-result-details-DAO';
import { TRPCError } from '@trpc/server';

export const raceResultRouter = router({
	getRaceResult: publicProcedure
		.input(
			z.object({
				year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
				id: z.string().regex(/^\d{1,2}$/, 'Id must be a number'),
			})
		)
		.query(async ({ input, ctx }) => {
			try {
				const { year, id } = input;
				const raceResultsDAO = RaceResultDetailsDAO.getInstance(ctx.env);
				const raceResults = await raceResultsDAO.getRaceResultDetails(year, id);

				if (!raceResults) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: `No race results found for year ${year} and id ${id}`,
					});
				}

				return raceResults;
			} catch (error) {
				if (error instanceof TRPCError) throw error;

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to get race results',
				});
			}
		}),
});
