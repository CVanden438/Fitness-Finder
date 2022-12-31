import { router } from "../trpc";
import { authRouter } from "./auth";
import { classRouter } from "./class";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  class: classRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
