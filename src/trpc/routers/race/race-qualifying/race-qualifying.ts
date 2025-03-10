import { RaceQualifyingDAO } from '../../../../db/race/race-qualifying/race-qualifying-DAO';
import { TRPCError } from '@trpc/server';

export const raceQualifyingRouterImpl = (env: Env) => {
  return {
    getRaceQualifying: async (year: string, racePlace: string) => {
      const raceQualifyingDAO = RaceQualifyingDAO.getInstance(env);
      const raceQualifying = await raceQualifyingDAO.getRaceQualifying(year, racePlace);

      if (!raceQualifying) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race qualifying found for year ${year} and place ${racePlace}`,
        });
      }

      return raceQualifying;
    },
  };
};
