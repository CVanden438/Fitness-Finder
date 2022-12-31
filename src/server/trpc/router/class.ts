import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { Class, Prisma } from "@prisma/client";
import { contextProps } from "@trpc/react-query/dist/internals/context";
import { connect } from "http2";

//which values to return need to ue select: in query
const defaultClassSelect = Prisma.validator<Prisma.ClassSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  capacity: true,
  category: true,
  date: true,
  difficulty: true,
  duration: true,
  price: true,
  time: true,
  title: true,
  description: true,
});

export const classRouter = router({
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
  addClass: protectedProcedure
    .input(
      z.object({
        capacity: z.number().min(1),
        price: z.number().min(0),
        category: z.string().min(1),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]),
        time: z.string().min(1),
        duration: z.number().min(0),
        date: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;
      const dataWithId = { userId: id, ...input };
      const task: Class = await ctx.prisma.class.create({ data: dataWithId });
      return task;
    }),
  viewAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.class.findMany({
      orderBy: {
        createdAt: "asc",
      },
      // include: {
      //   participant: { include: { user: true } },
      //   host: true,
      // },
      // select: {
      //   host: { select: { image: true } },
      //   participant: { select: { user: { select: { name: true } } } },
      // },
      select: {
        ...defaultClassSelect,
        participant: {
          select: {
            user: {
              select: { name: true },
            },
          },
        },
        host: { select: { image: true, name: true } },
      },
    });
  }),
  addParticipant: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;
      const dataWithId = { userId: id, ...input };
      try {
        const participant = await ctx.prisma.participant.create({
          data: dataWithId,
        });
        return participant;
      } catch (error) {
        throw new Error("there was an error");
      }
    }),
  getParticipantsByClass: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.participant.findMany({
        where: { classId: input.classId },
      });
    }),
  getSingleClass: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.class.findUnique({
        where: { id: input.classId },
        select: {
          ...defaultClassSelect,
          participant: {
            select: {
              user: {
                select: { name: true, id: true },
              },
            },
          },
          _count: {
            select: {
              participant: true,
            },
          },
          host: { select: { image: true, name: true } },
        },
      });
    }),
});
