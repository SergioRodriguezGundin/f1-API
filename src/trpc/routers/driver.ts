import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '..';
import { DriverDAO } from '../../db/driver/driver-DAO';

export const driversRouter = router({
	getDrivers: publicProcedure
		.input(
			z.object({
				year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
			})
		)
		.query(async ({ input, ctx }) => {
			try {
				const driverDAO = DriverDAO.getInstance(ctx.env);
				const drivers = await driverDAO.getDrivers(input.year);

				if (!drivers || drivers.length === 0) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: `No drivers found for year ${input.year}`,
					});
				}

				return drivers;
			} catch (error) {
				if (error instanceof TRPCError) throw error;

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch drivers',
					cause: error,
				});
			}
		}),

	getDriverByName: publicProcedure
		.input(
			z.object({
				year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
				name: z.string().min(1, 'D  river name is required'),
			})
		)
		.query(async ({ input, ctx }) => {
			try {
				const driverDAO = DriverDAO.getInstance(ctx.env);
				const driver = await driverDAO.getDriverByName(input.year, input.name);

				if (!driver) {
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: `Driver not found for year ${input.year} and name ${input.name}`,
					});
				}

				return driver;
			} catch (error) {
				if (error instanceof TRPCError) throw error;

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to fetch driver',
					cause: error,
				});
			}
		}),
});
