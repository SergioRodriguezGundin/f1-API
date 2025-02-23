import { Hono } from 'hono';
import { DriverController } from './endpoints/driver/driver-controller';
import { RacesResultsController } from './endpoints/race/races-results/races-results-controller';
import { RaceResultDetailsController } from './endpoints/race/race-result-details/race-result-controller';
import { ScheduleController } from './endpoints/scheduler/schedule.controller';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './trpc/routers/main';
import { createContext } from './trpc';

export const app = new Hono();

app.use('/f1/*', async (c) => {
	const response = await fetchRequestHandler({
		endpoint: '/f1',
		req: c.req.raw,
		router: appRouter,
		createContext: async (opts) =>
			createContext({
				...opts,
				req: Object.assign(opts.req, { env: c.env }),
			}),
	});
	return response;
});

app.get('/', (c) => c.text('F1 API running!'));

// Driver
app.get('/:year/drivers', DriverController.getDrivers);
app.get('/:year/drivers/:name', DriverController.getDriverByName);

// Races Results
app.get('/:year/races/results', RacesResultsController.getRacesResults);
app.get('/:year/races/results/:id', RaceResultDetailsController.getRaceResultDetails);

// Schedule
app.get('/:year/schedule', ScheduleController.getSchedule);
app.get('/:year/schedule/nexts', ScheduleController.getNextRaces);
app.get('/:year/schedule/current', ScheduleController.getCurrentRace);

export default app;
