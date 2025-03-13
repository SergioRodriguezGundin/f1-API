import { TRPCError } from '@trpc/server';
import { SprintRaceDAO } from '../../../../db/sprint/sprint-race/sprint-race-DAO';

export const sprintRaceRouterImpl = (env: Env) => {
  return {
    getSprintRace: async (year: string, racePlace: string) => {
      const sprintRaceDAO = SprintRaceDAO.getInstance(env);
      const sprintRace = await sprintRaceDAO.getSprintRace(year, racePlace);

      if (!sprintRace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Sprint race in ${racePlace} for year ${year} not found`,
        });
      }
      return sprintRace;
    },
  };
};
