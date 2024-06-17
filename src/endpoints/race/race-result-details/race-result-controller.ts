import { Context } from 'hono';
import { RaceResultDetailsDAO } from '../../../db/race/race-result-details/race-result-details-DAO';


export class RaceResultDetailsController {
  static async getRaceResultDetails(c: Context) {
    const { id } = c.req.param();
    const raceResult = await RaceResultDetailsDAO.getInstance(c.env).getRaceResultDetails(id);
    return c.json(raceResult);
  }
}