import { router } from "../trpc";
import { classRouter } from "./class";
import { userRouter } from "./user";
export const appRouter = router({
  class: classRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
