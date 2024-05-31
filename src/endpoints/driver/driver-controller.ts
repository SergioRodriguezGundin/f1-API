import { Context } from 'hono';
import { DriverDAO } from '../../db/driver/driver-DAO';

export class DriverController {
  static async getDrivers(c: Context) {
    const driverDAO = DriverDAO.getInstance(c.env);
    const drivers = await driverDAO.getDrivers();
    return c.json(drivers);
  }
}