import { Team } from '../../xata';

export interface TeamDB extends Team {}

export interface TeamDAOInterface {
	getTeams(): Promise<TeamDB[]>;
	getTeamByName(name: string): Promise<TeamDB>;
}
