import { Hono } from 'hono';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './trpc/routers/main';
import { createContext } from './trpc';

export const app = new Hono();

app.use('/f1/*', async (c) => {
	const response = await fetchRequestHandler({
		endpoint: '/f1',
		req: c.req.raw,
		router: appRouter,
		createContext: async (opts) =>
			createContext({
				...opts,
				req: Object.assign(opts.req, { env: c.env }),
			}),
	});
	return response;
});

app.get('/', (c) => c.text('F1 API running!'));

export default app;
