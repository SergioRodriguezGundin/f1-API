import { IDriver } from '@gunsrf1/api-contracts/dist/drivers/drivers.interface';

export interface DriverDAOInterface {
  getDrivers(year: string): Promise<IDriver[]>;
  getDriverByName(year: string, name: string): Promise<IDriver>;
}
