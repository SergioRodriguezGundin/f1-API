import { TRPCError } from '@trpc/server';
import { RaceFastestLapsDAO } from '../../../../db/race/race-fastest-laps/race-fastest-laps-DAO';

export const raceFastestLapsRouterImpl = (env: Env) => {
  return {
    getRaceFastestLaps: async (year: string, racePlace: string) => {
      const raceFastestLapsDAO = RaceFastestLapsDAO.getInstance(env);
      const raceFastestLaps = await raceFastestLapsDAO.getRaceFastestLaps(year, racePlace);

      if (!raceFastestLaps) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race fastest laps found for year ${year} and place ${racePlace}`,
        });
      }

      return raceFastestLaps;
    },
  };
};
