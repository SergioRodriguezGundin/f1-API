import { router } from '../index';
import { driversRouter } from './driver';
import { teamRouter } from './team';

export const appRouter = router({
	team: teamRouter,
	driver: driversRouter,
});

export type AppRouter = typeof appRouter;
