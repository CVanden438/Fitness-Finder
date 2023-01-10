import {
  router,
  publicProcedure,
  protectedProcedure,
  instructorProcedure,
} from "../trpc";
import { z } from "zod";
export const userRouter = router({
  addInstructor: protectedProcedure
    .input(z.object({ bio: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.user.update({
        where: { id: userId },
        data: { role: "INSTRUCTOR", bio: input.bio },
      });
    }),
  uppdateBio: instructorProcedure
    .input(z.object({ bio: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.user.update({
        where: { id: userId },
        data: { bio: input.bio },
      });
    }),
  getAllInstructors: publicProcedure
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
          bio: true,
          _count: { select: { classes: true } },
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
