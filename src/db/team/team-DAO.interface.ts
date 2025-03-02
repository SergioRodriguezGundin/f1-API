import { ITeams } from '@gunsrf1/api-contracts/src/teams/teams.interface';

export interface TeamDAOInterface {
  getTeams(year: string): Promise<ITeams[]>;
  getTeamByName(year: string, name: string): Promise<ITeams>;
}
