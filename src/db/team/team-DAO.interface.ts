import { Team } from '../../xata';

export interface TeamDB extends Team { }

export interface TeamDAOInterface {
  getTeams(): Promise<TeamDB[]>
  getTeam(id: string): Promise<TeamDB>
  createTeam(team: TeamDB): Promise<TeamDB>
  updateTeam(id: string, team: TeamDB): Promise<TeamDB>
  deleteTeam(id: string): Promise<void>
}
