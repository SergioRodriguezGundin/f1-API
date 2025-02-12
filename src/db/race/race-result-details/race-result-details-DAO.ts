import { DBXataClient } from '../../xata-client';
import { RaceResultDetailsDB } from './race-result-details-DAO.interface';

export class RaceResultDetailsDAO implements RaceResultDetailsDAO {
	private static instance: RaceResultDetailsDAO;
	private readonly databaseClient: DBXataClient;
	private readonly env: Env;

	constructor(env: Env) {
		this.databaseClient = DBXataClient.getInstance(env);
		this.env = env;
	}

	static getInstance(env: Env): RaceResultDetailsDAO {
		if (!RaceResultDetailsDAO.instance) {
			RaceResultDetailsDAO.instance = new RaceResultDetailsDAO(env);
		}
		return RaceResultDetailsDAO.instance;
	}

	async getRaceResultDetails(year: string, racePlace: string): Promise<RaceResultDetailsDB[]> {
		const raceResultDetails = await this.databaseClient.getClient().db.Race_result.getAll({
			filter: { year: parseInt(year), place: racePlace },
		});
		return raceResultDetails as RaceResultDetailsDB[];
	}
}
