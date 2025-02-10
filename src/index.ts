import { Hono } from 'hono';
import { TeamController } from './endpoints/team/team-controller';
import { DriverController } from './endpoints/driver/driver-controller';
import { RacesResultsController } from './endpoints/race/races-results/races-results-controller';
import { RaceResultDetailsController } from './endpoints/race/race-result-details/race-result-controller';
import { ScheduleController } from './endpoints/scheduler/schedule.controller';

export const app = new Hono();
app.get('/', (c) => c.text('F1 API running!'));

// Team
app.get('/teams', TeamController.getTeams);
app.get('/teams/:name', TeamController.getTeamByName);

app.get('/drivers', DriverController.getDrivers);
app.get('/races-results', RacesResultsController.getRacesResults);
app.get('/races-results/:id', RaceResultDetailsController.getRaceResultDetails);
app.get('/schedule', ScheduleController.getSchedule);

export default app;
