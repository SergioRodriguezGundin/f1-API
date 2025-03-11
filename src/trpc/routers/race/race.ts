import { raceQualifyingRouterImpl } from './race-qualifying/race-qualifying';
import { racePracticeRouterImpl } from './race-practice/race-practice';
import { raceStartingGridRouterImpl } from './race-starting-grid/race-starting-grid';
import { racePitStopsRouterImpl } from './race-pitstops/race-pitstops';
import { raceFastestLapsRouterImpl } from './race-fastest-laps/race-fastest-laps';

export const raceRouterImpl = (env: Env) => {
  return {
    qualifying: raceQualifyingRouterImpl(env),
    practice: racePracticeRouterImpl(env),
    startingGrid: raceStartingGridRouterImpl(env),
    pitStops: racePitStopsRouterImpl(env),
    fastestLaps: raceFastestLapsRouterImpl(env),
  };
};
