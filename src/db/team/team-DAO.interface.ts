import { ITeam } from '@gunsrf1/api-contracts/src/teams/teams.interface';

export interface TeamDAOInterface {
  getTeams(year: string): Promise<ITeam[]>;
  getTeamByName(year: string, name: string): Promise<ITeam>;
}
