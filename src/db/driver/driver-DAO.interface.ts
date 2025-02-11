import { Driver } from '../../xata';

export interface DriverDB extends Driver {}

export interface DriverDAOInterface {
	getDrivers(year: string): Promise<DriverDB[]>;
	getDriverByName(year: string, name: string): Promise<DriverDB>;
}
