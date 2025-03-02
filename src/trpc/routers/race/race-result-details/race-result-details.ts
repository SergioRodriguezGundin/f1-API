import { RaceResultDetailsDAO } from '../../../../db/race/race-result-details/race-result-details-DAO';
import { TRPCError } from '@trpc/server';

export const raceResultDetailsRouterImpl = (env: Env) => {
  return {
    getRaceResultDetails: async (year: string, raceId: string) => {
      const raceResultsDAO = RaceResultDetailsDAO.getInstance(env);
      const raceResults = await raceResultsDAO.getRaceResultDetails(year, raceId);

      if (!raceResults) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race results found for year ${year} and id ${raceId}`,
        });
      }

      return raceResults;
    },
  };
};
