import { z } from 'zod';
import { router, publicProcedure } from '../index';
import { TeamDAO } from '../../db/team/team-DAO';
import { TRPCError } from '@trpc/server';

export const teamRouter = router({
	getTeams: publicProcedure
		.input(
			z.object({
				year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
			})
		)
		.query(async ({ input, ctx }) => {
			try {
				console.log('ctx.env', ctx.env);
				const teamDAO = TeamDAO.getInstance(ctx.env);
				const teams = await teamDAO.getTeams(input.year);

				if (!teams || teams.length === 0) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: `No teams found for year ${input.year}`,
					});
				}

				return teams;
			} catch (error) {
				if (error instanceof TRPCError) throw error;

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch teams',
					cause: error,
				});
			}
		}),

	getTeamByName: publicProcedure
		.input(
			z.object({
				year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
				name: z.string().min(1, 'Team name is required'),
			})
		)
		.query(async ({ input, ctx }) => {
			try {
				const teamDAO = TeamDAO.getInstance(ctx.env);
				const team = await teamDAO.getTeamByName(input.year, input.name);

				if (!team) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: `Team "${input.name}" not found for year ${input.year}`,
					});
				}

				return team;
			} catch (error) {
				if (error instanceof TRPCError) throw error;

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch team',
					cause: error,
				});
			}
		}),
});
