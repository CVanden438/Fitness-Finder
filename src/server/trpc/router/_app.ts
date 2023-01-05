import { router } from "../trpc";
import { authRouter } from "./auth";
import { classRouter } from "./class";
import { exampleRouter } from "./example";
import { userRouter } from "./user";
export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  class: classRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
