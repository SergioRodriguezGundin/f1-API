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
      TeamDAO.instance = new TeamDAO(env)
    }
    return TeamDAO.instance
  }

  async getTeams(): Promise<TeamDB[]> {
    const cahedTeams = await this.env.F1_CACHE.get('teams', "json")

    if (cahedTeams) {
      return cahedTeams as TeamDB[];
    }

    const teams = await this.databaseClient.getClient().db.Team.getAll();

    // save teams in CACHE
    await this.env.F1_CACHE.put('teams', JSON.stringify(teams));

    return teams as TeamDB[];
  }
  getTeam(id: string): Promise<TeamDB> {
    throw new Error('Method not implemented.');
  }
  createTeam(team: TeamDB): Promise<TeamDB> {
    throw new Error('Method not implemented.');
  }
  updateTeam(id: string, team: TeamDB): Promise<TeamDB> {
    throw new Error('Method not implemented.');
  }
  deleteTeam(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
