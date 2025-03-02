import { TeamDAOInterface } from './team-DAO.interface';
import { DBXataClient } from '../xata-client';
import { ITeam } from '@gunsrf1/api-contracts/src/teams/team.interface';

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

  async getTeams(year: string): Promise<ITeam[]> {
    const cahedTeams = await this.env.F1_CACHE.get(`teams`, 'json');

    if (cahedTeams && (cahedTeams as ITeam[]).length > 0) {
      return cahedTeams as ITeam[];
    }

    const teams = await this.databaseClient
      .getClient()
      .db.Team.filter({ year: parseInt(year) })
      .getAll();

    await this.env.F1_CACHE.put('teams', JSON.stringify(teams));

    return teams as ITeam[];
  }

  async getTeamByName(year: string, name: string): Promise<ITeam> {
    const cachedTeams = await this.env.F1_CACHE.get<ITeam[]>(`teams`, 'json');

    if (cachedTeams) {
      const team = cachedTeams.find((team) => team.queryName === name.toLowerCase());
      if (team) {
        return team;
      }
    }

    const team = await this.databaseClient
      .getClient()
      .db.Team.filter({ year: parseInt(year), queryName: name.toLowerCase() })
      .getFirstOrThrow();

    return team as ITeam;
  }
}
