import { IDriver } from '@gunsrf1/api-contracts/src/drivers/drivers.interface';
import { DBXataClient } from '../xata-client';
import { DriverDAOInterface } from './driver-DAO.interface';

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

  async getDrivers(year: string): Promise<IDriver[]> {
    const cachedDrivers = await this.env.F1_CACHE.get<IDriver[]>(`drivers-${year}`, 'json');

    if (cachedDrivers && cachedDrivers.length > 0) {
      return cachedDrivers;
    }

    const drivers = await this.databaseClient
      .getClient()
      .db.Driver.select(['*', 'team.id', 'team.name', 'team.car', 'team.icon'])
      .filter({ year: parseInt(year) })
      .sort('position', 'asc')
      .getAll();

    await this.env.F1_CACHE.put(`drivers-${year}`, JSON.stringify(drivers));

    return drivers as unknown as IDriver[];
  }

  async getDriverByName(year: string, name: string): Promise<IDriver> {
    const cachedDrivers = await this.env.F1_CACHE.get<IDriver[]>(`drivers-${year}`, 'json');

    if (cachedDrivers) {
      const driver = cachedDrivers.find((driver) => driver.queryName === name);
      if (driver) {
        return driver;
      }
    }

    const driver = await this.databaseClient
      .getClient()
      .db.Driver.filter({ year: parseInt(year), queryName: name })
      .getFirstOrThrow();
    return driver as unknown as IDriver;
  }
}
