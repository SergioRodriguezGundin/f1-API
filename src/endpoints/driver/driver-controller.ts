import { Context } from 'hono';
import { DriverDAO } from '../../db/driver/driver-DAO';

export class DriverController {
	static async getDrivers(c: Context) {
		const driverDAO = DriverDAO.getInstance(c.env);
		const year = c.req.param('year');
		const drivers = await driverDAO.getDrivers(year);
		return c.json(drivers);
	}
	static async getDriverByName(c: Context) {
		const driverDAO = DriverDAO.getInstance(c.env);
		const year = c.req.param('year');
		const name = c.req.param('name');
		const driver = await driverDAO.getDriverByName(year, name);
		return c.json(driver);
	}
}
