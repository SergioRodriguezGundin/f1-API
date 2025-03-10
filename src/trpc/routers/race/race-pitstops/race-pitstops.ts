import { TRPCError } from '@trpc/server';
import { RacePitStopsDAO } from '../../../../db/race/race-pit-stops/race-pit-stops-DAO';

export const racePitStopsRouterImpl = (env: Env) => {
  return {
    getRacePitStops: async (year: string, racePlace: string) => {
      const racePitStopsDAO = RacePitStopsDAO.getInstance(env);
      const racePitStops = await racePitStopsDAO.getRacePitStops(year, racePlace);

      if (!racePitStops) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race pit stops found for year ${year} and place ${racePlace}`,
        });
      }

      return racePitStops;
    },
  };
};
