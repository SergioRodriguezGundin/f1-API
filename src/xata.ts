// Generated by Xata Codegen 0.29.5. Please do not edit.
import { buildClient } from '@xata.io/client';
import type { BaseClientOptions, SchemaInference, XataRecord } from '@xata.io/client';

const tables = [
  {
    name: 'Driver',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'points', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'image', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'nationality', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'name', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
      { name: 'queryName', type: 'text', notNull: true, defaultValue: ' ' },
    ],
    revLinks: [
      { column: 'driver', table: 'Race_result' },
      { column: 'winner', table: 'Races_result' },
      { column: 'driver', table: 'Race_fastest_laps' },
      { column: 'driver', table: 'Race_pit_stops' },
      { column: 'driver', table: 'Race_starting_grid' },
      { column: 'driver', table: 'Race_qualifying' },
      { column: 'driver', table: 'Race_practice' },
      { column: 'driver', table: 'Sprint_qualifying' },
      { column: 'driver', table: 'Sprint_grid' },
      { column: 'driver', table: 'Sprint_race' },
    ],
  },
  {
    name: 'Team',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'points', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'image', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'name', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'icon', type: 'string' },
      { name: 'car', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
      { name: 'queryName', type: 'text', notNull: true, defaultValue: ' ' },
    ],
    revLinks: [
      { column: 'team', table: 'Driver' },
      { column: 'team', table: 'Races_result' },
      { column: 'team', table: 'Race_result' },
      { column: 'team', table: 'Race_fastest_laps' },
      { column: 'team', table: 'Race_pit_stops' },
      { column: 'team', table: 'Race_starting_grid' },
      { column: 'team', table: 'Race_qualifying' },
      { column: 'team', table: 'Race_practice' },
      { column: 'team', table: 'Sprint_qualifying' },
      { column: 'team', table: 'Sprint_grid' },
      { column: 'team', table: 'Sprint_race' },
    ],
  },
  {
    name: 'Races_result',
    columns: [
      { name: 'track', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'time', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'laps', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'date', type: 'string', notNull: true, defaultValue: ' ' },
      { name: 'winner', type: 'link', link: { table: 'Driver' } },
      { name: 'isSprintRace', type: 'bool', defaultValue: 'false' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
    ],
  },
  {
    name: 'Race_result',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'laps', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'timeOrRetired', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'points', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
      { name: 'place', type: 'string', notNull: true, defaultValue: ' ' },
    ],
  },
  {
    name: 'Schedule',
    columns: [
      { name: 'round', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'days', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'month', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'flag', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'title', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'trackImage', type: 'text' },
      {
        name: 'firstPlace',
        type: 'json',
        defaultValue: '{\r\n    "driverImage": "",\r\n    "driverName": ""\r\n}',
      },
      {
        name: 'secondPlace',
        type: 'json',
        defaultValue: '{\r\n    "driverImage": "",\r\n    "driverName": ""\r\n}',
      },
      {
        name: 'thirdPlace',
        type: 'json',
        defaultValue: '{\r\n    "driverImage": "",\r\n    "driverName": ""\r\n}',
      },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
      { name: 'isSprintRace', type: 'bool', defaultValue: 'false' },
      { name: 'date', type: 'datetime', unique: true },
    ],
  },
  {
    name: 'Race_fastest_laps',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'lap', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'time', type: 'text' },
      { name: 'timeOfDay', type: 'text' },
      { name: 'avgSpeed', type: 'text' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
    ],
  },
  {
    name: 'Race_pit_stops',
    columns: [
      { name: 'stops', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'lap', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'timeOfDay', type: 'text' },
      { name: 'time', type: 'text' },
      { name: 'total', type: 'text' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
    ],
  },
  {
    name: 'Race_starting_grid',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'time', type: 'text' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
    ],
  },
  {
    name: 'Race_qualifying',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'q1Time', type: 'text' },
      { name: 'q2Time', type: 'text' },
      { name: 'q3Time', type: 'text' },
      { name: 'laps', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
    ],
  },
  {
    name: 'Race_practice',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'time', type: 'text' },
      { name: 'gap', type: 'text' },
      { name: 'laps', type: 'int' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'session', type: 'int', notNull: true, defaultValue: '0' },
    ],
  },
  {
    name: 'Sprint_qualifying',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'q1Time', type: 'text' },
      { name: 'q2Time', type: 'text' },
      { name: 'q3Time', type: 'text' },
      { name: 'laps', type: 'int' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
    ],
  },
  {
    name: 'Sprint_grid',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'time', type: 'text' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
    ],
  },
  {
    name: 'Sprint_race',
    columns: [
      { name: 'position', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driverNumber', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'driver', type: 'link', link: { table: 'Driver' } },
      { name: 'team', type: 'link', link: { table: 'Team' } },
      { name: 'laps', type: 'int' },
      { name: 'time', type: 'text' },
      { name: 'points', type: 'int', notNull: true, defaultValue: '0' },
      { name: 'place', type: 'text', notNull: true, defaultValue: ' ' },
      { name: 'year', type: 'int', notNull: true, defaultValue: '2024' },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Driver = InferredTypes['Driver'];
export type DriverRecord = Driver & XataRecord;

export type Team = InferredTypes['Team'];
export type TeamRecord = Team & XataRecord;

export type RacesResult = InferredTypes['Races_result'];
export type RacesResultRecord = RacesResult & XataRecord;

export type RaceResult = InferredTypes['Race_result'];
export type RaceResultRecord = RaceResult & XataRecord;

export type Schedule = InferredTypes['Schedule'];
export type ScheduleRecord = Schedule & XataRecord;

export type RaceFastestLaps = InferredTypes['Race_fastest_laps'];
export type RaceFastestLapsRecord = RaceFastestLaps & XataRecord;

export type RacePitStops = InferredTypes['Race_pit_stops'];
export type RacePitStopsRecord = RacePitStops & XataRecord;

export type RaceStartingGrid = InferredTypes['Race_starting_grid'];
export type RaceStartingGridRecord = RaceStartingGrid & XataRecord;

export type RaceQualifying = InferredTypes['Race_qualifying'];
export type RaceQualifyingRecord = RaceQualifying & XataRecord;

export type RacePractice = InferredTypes['Race_practice'];
export type RacePracticeRecord = RacePractice & XataRecord;

export type SprintQualifying = InferredTypes['Sprint_qualifying'];
export type SprintQualifyingRecord = SprintQualifying & XataRecord;

export type SprintGrid = InferredTypes['Sprint_grid'];
export type SprintGridRecord = SprintGrid & XataRecord;

export type SprintRace = InferredTypes['Sprint_race'];
export type SprintRaceRecord = SprintRace & XataRecord;

export type DatabaseSchema = {
  Driver: DriverRecord;
  Team: TeamRecord;
  Races_result: RacesResultRecord;
  Race_result: RaceResultRecord;
  Schedule: ScheduleRecord;
  Race_fastest_laps: RaceFastestLapsRecord;
  Race_pit_stops: RacePitStopsRecord;
  Race_starting_grid: RaceStartingGridRecord;
  Race_qualifying: RaceQualifyingRecord;
  Race_practice: RacePracticeRecord;
  Sprint_qualifying: SprintQualifyingRecord;
  Sprint_grid: SprintGridRecord;
  Sprint_race: SprintRaceRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: '',
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions & { env: Env }) {
    const envOptions = options?.env
      ? {
          apiKey: options.env.XATA_API_KEY,
          branch: options.env.XATA_BRANCH,
          databaseURL: options.env.XATA_DATABASE_URL,
        }
      : {};

    super({ ...defaultOptions, ...envOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = (env: Env) => {
  if (instance) return instance;

  instance = new XataClient({ env });
  return instance;
};
