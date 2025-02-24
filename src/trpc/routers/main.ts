import { router } from '../index';
import { driversRouter } from './driver';
import { schedulerRouter } from './scheduler';
import { teamRouter } from './team';
import { raceResultRouter } from './race/race-result';
import { raceResultsRouter } from './race/race-results';

export const appRouter = router({
  team: teamRouter,
  driver: driversRouter,
  scheduler: schedulerRouter,
  raceResult: raceResultRouter,
  raceResults: raceResultsRouter,
});

export type AppRouter = typeof appRouter;
