import { sprintRaceRouterImpl } from './sprint-race/sprint-race';

export const sprintRouterImpl = (env: Env) => {
  return {
    sprintRace: sprintRaceRouterImpl(env),
  };
};
