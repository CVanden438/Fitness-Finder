import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
export const userRouter = router({
  makeInstructor: protectedProcedure.mutation(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.user.update({
      where: { id: userId },
      data: { role: "INSTRUCTOR" },
    });
  }),
  viewAllInstructors: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        page: z.coerce.number().default(1),
        limit: z.number().max(50).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      // const where = {
      //   role:"INSTRUCTOR",
      //   name:{contains:input?.search}
      // }
      const items = await ctx.prisma.user.findMany({
        where: { role: "INSTRUCTOR", name: { contains: input?.search } },
        take: input.limit,
        skip: input.limit * (input.page - 1),
        select: {
          name: true,
          image: true,
          id: true,
        },
      });
      const count = await ctx.prisma.user.count({
        where: { role: "INSTRUCTOR", name: { contains: input?.search } },
      });
      return {
        items,
        count,
      };
    }),
});
