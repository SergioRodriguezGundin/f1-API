import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Context, Hono } from 'hono';

import { f1Router } from '@gunsrf1/api-contracts';
import { cors } from 'hono/cors';
import { driverRouterImpl } from './trpc/routers/driver';
import { raceResultDetailsRouterImpl } from './trpc/routers/race/race-result-details/race-result-details';
import { racesResultsRouterImpl } from './trpc/routers/races/races-results/races-results';
import { schedulerRouterImpl } from './trpc/routers/scheduler';
import { teamRouterImpl } from './trpc/routers/team';
import { raceQualifyingRouterImpl } from './trpc/routers/race/race-qualifying/race-qualifying';
import { racePracticeRouterImpl } from './trpc/routers/race/race-practice/race-practice';
import { raceStartingGridRouterImpl } from './trpc/routers/race/race-starting-grid/race-starting-grid';

export const app = new Hono();

app.use(
  '*',
  cors({
    origin: ['http://localhost:4200'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'trpc-batch', // Important for tRPC
      'x-trpc-source', // Important for tRPC
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposeHeaders: ['Content-Length', 'Content-Type', 'Cache-Control'],
    credentials: true,
    maxAge: 3600,
  })
);

const createContextWithEnv = async (opts: any, env: Env) => {
  return {
    api: {
      teams: teamRouterImpl(env),
      drivers: driverRouterImpl(env),
      scheduler: schedulerRouterImpl(env),
      racesResults: racesResultsRouterImpl(env),
      raceResultDetails: raceResultDetailsRouterImpl(env),
      race: {
        qualifying: raceQualifyingRouterImpl(env),
        practice: racePracticeRouterImpl(env),
        startingGrid: raceStartingGridRouterImpl(env),
      },
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
      const response = new Response(cachedResponse.body, cachedResponse);
      response.headers.set('Cache-Control', 's-maxage=3600');
      return response;
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
