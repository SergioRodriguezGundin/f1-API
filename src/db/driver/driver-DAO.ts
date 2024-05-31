import { Env } from '../../env.interface';
import { DBXataClient } from '../xata-client';
import { DriverDAOInterface, DriverDB } from './driver-DAO.interface';

export class DriverDAO implements DriverDAOInterface {
  private static instance: DriverDAO;
  private readonly databaseClient: DBXataClient;
  private readonly env: Env;

  private constructor(env: Env) {
    this.databaseClient = DBXataClient.getInstance(env);
    this.env = env;
  }

  static getInstance(env: Env): DriverDAO {
    if (!DriverDAO.instance) {
      DriverDAO.instance = new DriverDAO(env);
    }
    return DriverDAO.instance;
  }

  getDriver(): Promise<DriverDB> {
    throw new Error('Method not implemented.');
  }

  async getDrivers(): Promise<DriverDB[]> {
    const cachedDrivers = await this.env.F1_CACHE.get('drivers', "json");

    if (cachedDrivers) {
      return cachedDrivers as DriverDB[];
    }

    const drivers = await this.databaseClient.getClient().db.Driver.getAll();

    // save drivers in CACHE
    await this.env.F1_CACHE.put('drivers', JSON.stringify(drivers));

    return drivers as DriverDB[];
  }

  createDriver(driver: DriverDB): Promise<DriverDB> {
    throw new Error('Method not implemented.');
  }

  updateDriver(id: string): Promise<DriverDB> {
    throw new Error('Method not implemented.');
  }

  deleteDriver(id: string): Promise<DriverDB> {
    throw new Error('Method not implemented.');
  }

}
