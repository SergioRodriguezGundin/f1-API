import { TRPCError } from '@trpc/server';
import { DriverDAO } from '../../db/driver/driver-DAO';

export const driverRouterImpl = (env: Env) => {
  return {
    getDrivers: async (year: string) => {
      const driverDAO = DriverDAO.getInstance(env);
      const drivers = await driverDAO.getDrivers(year);

      if (!drivers || drivers.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No drivers found for year ${year}`,
        });
      }

      return drivers;
    },
    getDriverByName: async (year: string, name: string) => {
      const driverDAO = DriverDAO.getInstance(env);
      const driver = await driverDAO.getDriverByName(year, name);

      if (!driver) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Driver not found for year ${year} and name ${name}`,
        });
      }

      return driver;
    },
  };
};
