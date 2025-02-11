import { Hono } from 'hono';
import { TeamController } from './endpoints/team/team-controller';
import { DriverController } from './endpoints/driver/driver-controller';
import { RacesResultsController } from './endpoints/race/races-results/races-results-controller';
import { RaceResultDetailsController } from './endpoints/race/race-result-details/race-result-controller';
import { ScheduleController } from './endpoints/scheduler/schedule.controller';

export const app = new Hono();
app.get('/', (c) => c.text('F1 API running!'));

// Team
app.get('/:year/teams', TeamController.getTeams);
app.get('/:year/teams/:name', TeamController.getTeamByName);

// Driver
app.get('/:year/drivers', DriverController.getDrivers);
app.get('/:year/drivers/:name', DriverController.getDriverByName);

// Races Results
app.get('/:year/races-results', RacesResultsController.getRacesResults);
app.get('/:year/races-results/:id', RaceResultDetailsController.getRaceResultDetails);

// Schedule
app.get('/:year/schedule', ScheduleController.getSchedule);

export default app;
