import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Context, Hono } from 'hono';

import { f1Router } from '@gunsrf1/api-contracts';
import { driverRouterImpl } from './trpc/routers/driver';
import { schedulerRouterImpl } from './trpc/routers/scheduler';
import { teamRouterImpl } from './trpc/routers/team';
import { raceResultDetailsRouterImpl } from './trpc/routers/race/race-result-details/race-result-details';
import { racesResultsRouterImpl } from './trpc/routers/race/races-results/races-results';

export const app = new Hono();

const createContextWithEnv = async (opts: any, env: Env) => {
  return {
    api: {
      teams: teamRouterImpl(env),
      drivers: driverRouterImpl(env),
      scheduler: schedulerRouterImpl(env),
      racesResults: racesResultsRouterImpl(env),
      raceResultDetails: raceResultDetailsRouterImpl(env),
    },
  };
};

const requestHandler = async (c: Context) => {
  return await fetchRequestHandler({
    endpoint: '/f1',
    req: c.req.raw,
    router: f1Router,
    createContext: async (opts) => createContextWithEnv(opts, c.env),
  });
};

app.all('/f1/*', async (c) => {
  const request = c.req.raw;

  if (request.method === 'GET') {
    const cache = caches.default;

    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await requestHandler(c);
    response.headers.set('Cache-Control', 's-maxage=3600');

    c.executionCtx.waitUntil(cache.put(request, response.clone()));

    return response;
  }

  // no-GET (mutations, etc)
  return await requestHandler(c);
});

app.get('/', (c) => c.text('F1 API running!'));

export default app;
