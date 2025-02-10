import { Driver } from '../../xata';

export interface DriverDB extends Driver { }

export interface DriverDAOInterface {
  getDriver(): Promise<DriverDB>;
  getDrivers(): Promise<DriverDB[]>;
}
