import { TRPCError } from '@trpc/server';
import { RacesResultsDAO } from '../../../../db/race/races-results/races-results-DAO';

export const racesResultsRouterImpl = (env: Env) => {
  return {
    getRacesResults: async (year: string) => {
      const racesResultsDAO = RacesResultsDAO.getInstance(env);
      const raceResults = await racesResultsDAO.getRacesResults(year);

      if (!raceResults) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race results found for year ${year}`,
        });
      }

      return raceResults;
    },
  };
};
