import { TeamDAOInterface } from './team-DAO.interface';
import { DBXataClient } from '../xata-client';
import { ITeam } from '@gunsrf1/api-contracts/src/teams/teams.interface';
import { TRPCError } from '@trpc/server';

export class TeamDAO implements TeamDAOInterface {
  private static instance: TeamDAO;
  private readonly databaseClient: DBXataClient;
  private readonly env: Env;

  constructor(env: Env) {
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
    try {
      const cahedTeams = await this.env.F1_CACHE.get(`teams-${year}`, 'json');

      if (cahedTeams && (cahedTeams as ITeam[]).length > 0) {
        return cahedTeams as ITeam[];
      }

      const teams = await this.databaseClient
        .getClient()
        .db.Team.filter({ year: parseInt(year) })
        .sort('points', 'desc')
        .getAll();

      await this.env.F1_CACHE.put(`teams-${year}`, JSON.stringify(teams));

      return teams as ITeam[];
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting teams for year ${year}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }

  async getTeamByName(year: string, name: string): Promise<ITeam> {
    try {
      const cachedTeams = await this.env.F1_CACHE.get<ITeam[]>(`teams-${year}`, 'json');

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
    } catch (error) {
      if (error instanceof Error && error.message.includes('No record found')) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Team not found for year ${year} and name ${name}`,
        });
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Error getting team for year ${year} and name ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  }
}
