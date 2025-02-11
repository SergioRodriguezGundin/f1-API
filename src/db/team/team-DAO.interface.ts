import { Team } from '../../xata';

export interface TeamDB extends Team {}

export interface TeamDAOInterface {
	getTeams(year: string): Promise<TeamDB[]>;
	getTeamByName(year: string, name: string): Promise<TeamDB>;
}
