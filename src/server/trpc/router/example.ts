import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  addTask: protectedProcedure
    .input(z.object({ name: z.string(), completed: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;
      const task = await ctx.prisma.task.create({
        data: { userId: id, name: input.name, completed: input.completed },
        // userId: input.id,
        // name: input.name,
        // completed: input.completed,
      });
      return task;
    }),
});
