import { TRPCError } from '@trpc/server';
import { RacePracticeDAO } from '../../../../db/race/race-practice/race-practice-DAO';

export const racePracticeRouterImpl = (env: Env) => {
  return {
    getRacePractice: async (year: string, racePlace: string) => {
      const racePracticeDAO = RacePracticeDAO.getInstance(env);
      const racePractice = await racePracticeDAO.getRacePractice(year, racePlace);

      if (!racePractice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race practice found for year ${year} and place ${racePlace}`,
        });
      }

      return racePractice;
    },
    getRacePracticeBySession: async (year: string, racePlace: string, session: string) => {
      const racePracticeDAO = RacePracticeDAO.getInstance(env);
      const racePractice = await racePracticeDAO.getRacePracticeBySession(year, racePlace, session);

      if (!racePractice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No race practice found for year ${year} and place ${racePlace} and session ${session}`,
        });
      }

      return racePractice;
    },
  };
};
