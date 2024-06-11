import { Context } from 'hono';
import { RacesResultsDAO } from '../../../db/race/races-results/races-results-DAO';

export class RacesResultsController {
  static async getRacesResults(c: Context) {
    const racesResultsDAO = RacesResultsDAO.getInstance(c.env);
    const racesResults = await racesResultsDAO.getRacesResults();
    return c.json(racesResults);
  }
}

