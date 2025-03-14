import { TRPCError } from '@trpc/server';
import { SprintGridDAO } from '../../../../db/sprint/sprint-grid/sprint-grid-DAO';

export const sprintGridRouterImpl = (env: Env) => {
  return {
    getSprintGrid: async (year: string, racePlace: string) => {
      const sprintGridDAO = SprintGridDAO.getInstance(env);
      const sprintGrid = await sprintGridDAO.getSprintGrid(year, racePlace);

      if (!sprintGrid) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Sprint grid for ${year} in ${racePlace} not found`,
        });
      }
      return sprintGrid;
    },
  };
};
