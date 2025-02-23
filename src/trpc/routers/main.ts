import { router } from '../index';
import { driversRouter } from './driver';
import { schedulerRouter } from './scheduler';
import { teamRouter } from './team';

export const appRouter = router({
	team: teamRouter,
	driver: driversRouter,
	scheduler: schedulerRouter,
});

export type AppRouter = typeof appRouter;
