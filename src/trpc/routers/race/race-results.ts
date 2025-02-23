import { router } from '../..';
import { z } from 'zod';
import { publicProcedure } from '../..';
import { TRPCError } from '@trpc/server';
import { RacesResultsDAO } from '../../../db/race/races-results/races-results-DAO';

export const raceResultsRouter = router({
	getRaceResult: publicProcedure
		.input(
			z.object({
				year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
			})
		)
		.query(async ({ input, ctx }) => {
			try {
				const { year } = input;
				const racesResultsDAO = RacesResultsDAO.getInstance(ctx.env);
				const raceResults = await racesResultsDAO.getRacesResults(year);

				if (!raceResults) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: `No race results found for year ${year}`,
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
