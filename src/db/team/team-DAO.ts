import { TeamDAOInterface, TeamDB } from './team-DAO.interface';
import { DBXataClient } from '../xata-client';

export class TeamDAO implements TeamDAOInterface {
	private static instance: TeamDAO;
	private readonly databaseClient: DBXataClient;
	private readonly env: Env;

	private constructor(env: Env) {
		this.databaseClient = DBXataClient.getInstance(env);
		this.env = env;
	}

	public static getInstance(env: Env) {
		if (!TeamDAO.instance) {
			TeamDAO.instance = new TeamDAO(env);
		}
		return TeamDAO.instance;
	}

	async getTeams(): Promise<TeamDB[]> {
		const cahedTeams = await this.env.F1_CACHE.get('teams', 'json');

		if (cahedTeams) {
			return cahedTeams as TeamDB[];
		}

		const teams = await this.databaseClient.getClient().db.Team.getAll();

		// save teams in CACHE
		await this.env.F1_CACHE.put('teams', JSON.stringify(teams));

		return teams as TeamDB[];
	}

	async getTeamByName(name: string): Promise<TeamDB> {
		const cachedTeams: string | null = await this.env.F1_CACHE.get(`teams`, 'json');

		if (cachedTeams) {
			const parsedTeams = JSON.parse(cachedTeams) as TeamDB[];
			const team = parsedTeams.find((team) => team.name === name);
			if (team) {
				return team;
			}
		}

		const team = await this.databaseClient.getClient().db.Team.getFirst({
			filter: {
				name: name,
			},
		});

		return team as TeamDB;
	}
}
