import { sprintGridRouterImpl } from './sprint-grid/sprint-grid';
import { sprintQualifyingRouterImpl } from './sprint-qualifying/sprint-qualifying';
import { sprintRaceRouterImpl } from './sprint-race/sprint-race';

export const sprintRouterImpl = (env: Env) => {
  return {
    sprintRace: sprintRaceRouterImpl(env),
    sprintQualifying: sprintQualifyingRouterImpl(env),
    sprintGrid: sprintGridRouterImpl(env),
  };
};
