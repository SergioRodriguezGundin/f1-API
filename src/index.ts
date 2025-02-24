import { Context, Hono } from 'hono';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './trpc/routers/main';
import { createContext } from './trpc';

export const app = new Hono();

const createContextWithEnv = async (opts: any, env: any) => {
  return createContext({
    ...opts,
    req: Object.assign(opts.req, { env }),
  });
};

const requestHandler = async (c: Context) => {
  return await fetchRequestHandler({
    endpoint: '/f1',
    req: c.req.raw,
    router: appRouter,
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
