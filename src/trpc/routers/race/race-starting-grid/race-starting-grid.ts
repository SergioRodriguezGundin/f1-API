import { TRPCError } from '@trpc/server';
import { RaceStartingGridDAO } from '../../../../db/race/race-starting-grid/race-starting-grid-DAO';

export const raceStartingGridRouterImpl = (env: Env) => {
  return {
    getRaceStartingGrid: async (year: string, racePlace: string) => {
      const raceStartingGridDAO = RaceStartingGridDAO.getInstance(env);
      const raceStartingGrid = await raceStartingGridDAO.getRaceStartingGrid(year, racePlace);

      if (!raceStartingGrid) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race starting grid found for year ${year} and place ${racePlace}`,
        });
      }

      return raceStartingGrid;
    },
  };
};
