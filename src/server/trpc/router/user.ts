import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  makeInstructor: protectedProcedure.mutation(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.user.update({
      where: { id: userId },
      data: { role: "INSTRUCTOR" },
    });
  }),
});
