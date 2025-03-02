import { TeamDAO } from '../../db/team/team-DAO';
import { TRPCError } from '@trpc/server';

export const teamRouterImpl = (env: Env) => {
  return {
    getTeams: async (year: string) => {
      try {
        const teamDAO = TeamDAO.getInstance(env);
        const teams = await teamDAO.getTeams(year);

        if (!teams || teams.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No teams found for year ${year}`,
          });
        }

        return teams;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch teams',
          cause: error,
        });
      }
    },
    getTeamByName: async (year: string, name: string) => {
      try {
        const teamDAO = TeamDAO.getInstance(env);
        const team = await teamDAO.getTeamByName(year, name);

        if (!team) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Team "${name}" not found for year ${year}`,
          });
        }

        return team;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch team',
          cause: error,
        });
      }
    },
  };
};
