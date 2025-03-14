import { TRPCError } from '@trpc/server';
import { SprintQualifyingDAO } from '../../../../db/sprint/sprint-qualifying/sprint-qualifying-DAO';

export const sprintQualifyingRouterImpl = (env: Env) => {
  return {
    getSprintQualifying: async (year: string, racePlace: string) => {
      const sprintQualifyingDAO = SprintQualifyingDAO.getInstance(env);
      const sprintQualifying = await sprintQualifyingDAO.getSprintQualifying(year, racePlace);

      if (!sprintQualifying) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Sprint qualifying for ${year} in ${racePlace} not found`,
        });
      }
      return sprintQualifying;
    },
  };
};
