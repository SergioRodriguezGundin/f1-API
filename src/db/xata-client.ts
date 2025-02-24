import { getXataClient, XataClient } from '../xata';
import { DBClient } from './db-client.interface';

export class DBXataClient implements DBClient<XataClient> {
  private static instance: DBXataClient;
  private client: XataClient;

  private constructor(env: Env) {
    this.client = getXataClient(env);
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
