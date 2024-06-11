import { Hono } from "hono";
import { TeamController } from './endpoints/team/team-controller';
import { DriverController } from './endpoints/driver/driver-controller';
import { RacesResultsController } from './endpoints/race/races-results/races-results-controller';

export const app = new Hono();
app.get("/", (c) => c.text("F1 API running!"));

// Team
app.get('/teams', TeamController.getTeams);
app.get('/drivers', DriverController.getDrivers);
app.get('/races-results', RacesResultsController.getRacesResults);

export default app

