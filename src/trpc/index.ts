import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

// Context creation
export const createContext = async (opts: FetchCreateContextFnOptions) => {
	const req = opts.req as Request & { env: Env };
	return {
		env: req.env,
	};
};

type Context = inferAsyncReturnType<typeof createContext>;

// Initialize tRPC
export const t = initTRPC.context<Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
