import { Env } from '../env.interface';
import { XataClient } from '../xata';
import { DBClient } from './db-client.interface';

export class DBXataClient implements DBClient {
  private static instance: DBXataClient;
  private client: XataClient;

  private constructor(env: Env) {
    this.client = new XataClient({
      apiKey: env.XATA_API_KEY,
      branch: env.XATA_BRANCH,
      databaseURL: env.XATA_DATABASE_URL,
    });
  }

  public static getInstance(env: Env): DBXataClient {
    if (!DBXataClient.instance) {
      DBXataClient.instance = new DBXataClient(env);
    }
    return DBXataClient.instance;
  }

  public getClient(): XataClient {
    return this.client;
  }
}
