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

	async getTeams(year: string): Promise<TeamDB[]> {
		const cahedTeams = await this.env.F1_CACHE.get(`teams`, 'json');

		if (cahedTeams) {
			return cahedTeams as TeamDB[];
		}

		const teams = await this.databaseClient
			.getClient()
			.db.Team.filter({ year: parseInt(year) })
			.getAll();

		// save teams in CACHE
		await this.env.F1_CACHE.put('teams', JSON.stringify(teams));

		return teams as TeamDB[];
	}

	async getTeamByName(year: string, name: string): Promise<TeamDB> {
		const cachedTeams = await this.env.F1_CACHE.get<TeamDB[]>(`teams`, 'json');

		if (cachedTeams) {
			const team = cachedTeams.find((team) => team.queryName === name);
			if (team) {
				return team;
			}
		}

		const team = await this.databaseClient
			.getClient()
			.db.Team.filter({ year: parseInt(year), queryName: name })
			.getFirstOrThrow();

		return team as TeamDB;
	}
}
