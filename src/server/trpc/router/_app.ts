import { router } from "../trpc";
import { classRouter } from "./class";
import { paymentRouter } from "./payment";
import { userRouter } from "./user";
export const appRouter = router({
  class: classRouter,
  user: userRouter,
  payment: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
