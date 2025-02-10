import { Context } from 'hono';
import { TeamDAO } from '../../db/team/team-DAO';

export class TeamController {
	static async getTeams(c: Context) {
		const teamDAO = TeamDAO.getInstance(c.env);
		const teams = await teamDAO.getTeams();
		return c.json(teams);
	}
	static async getTeamByName(c: Context) {
		const teamDAO = TeamDAO.getInstance(c.env);
		const team = await teamDAO.getTeamByName(c.req.param('name'));
		return c.json(team);
	}
}
