import { Driver } from '../../xata';

export interface DriverDB extends Driver { }

export interface DriverDAOInterface {
  getDriver(): Promise<DriverDB>;
  getDrivers(): Promise<DriverDB[]>;
  createDriver(driver: DriverDB): Promise<DriverDB>;
  updateDriver(id: string): Promise<DriverDB>;
  deleteDriver(id: string): Promise<DriverDB>;
}
