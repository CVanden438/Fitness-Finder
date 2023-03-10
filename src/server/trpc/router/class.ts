import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { Class, Prisma } from "@prisma/client";
import { contextProps } from "@trpc/react-query/dist/internals/context";
import { connect } from "http2";

//standard class data for use in select
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

  //  --Cursor based pagination--
  // viewAll: publicProcedure
  //   .input(
  //     z.object({
  //       category: z.string().optional(),
  //       difficulty: z.string().optional(),
  //       search: z.string().optional(),
  //       cursorId: z.string().optional(),
  //       limit: z.number().max(20).optional(),
  //       upcoming: z.boolean().default(true),
  //     })
  //   )
  //   .query(async ({ input, ctx }) => {
  //     const currDate = new Date().toISOString().slice(0, 10);
  //     let where = {};
  //     if (input.upcoming) {
  //       where = {
  //         category: input?.category,
  //         difficulty: input?.difficulty,
  //         host: { name: { contains: input?.search } },
  //         date: { gte: currDate },
  //       };
  //     } else {
  //       where = {
  //         category: input?.category,
  //         difficulty: input?.difficulty,
  //         host: { name: { contains: input?.search } },
  //         date: { lt: currDate },
  //       };
  //     }
  //     const limit = input?.limit ?? 10;
  //     const cursorId = input?.cursorId;
  //     let items = await ctx.prisma.class.findMany({
  //       orderBy: {
  //         id: "asc",
  //       },
  //       take: limit + 1,
  //       cursor: cursorId ? { id: cursorId } : undefined,
  //       where,
  //       select: {
  //         ...defaultClassSelect,
  //         participant: {
  //           select: {
  //             user: {
  //               select: { name: true },
  //             },
  //           },
  //         },
  //         host: { select: { image: true, name: true } },
  //         _count: {
  //           select: {
  //             participant: true,
  //           },
  //         },
  //       },
  //     });
  //     let nextCursor = undefined;
  //     if (items.length > limit) {
  //       const nextItem = items.pop();
  //       nextCursor = nextItem?.id;
  //     }
  //     return {
  //       items,
  //       nextCursor,
  //     };
  //   }),

  //--Standard skip based pagination--
  getAllClass: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        difficulty: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().max(20).default(10),
        page: z.coerce.number().default(1),
        upcoming: z.boolean().default(true),
      })
    )
    .query(async ({ input, ctx }) => {
      const currDate = new Date().toISOString().slice(0, 10);
      let where = {};
      if (input.upcoming) {
        where = {
          category: input?.category,
          difficulty: input?.difficulty,
          host: { name: { contains: input?.search } },
          date: { gte: currDate },
        };
      } else {
        where = {
          category: input?.category,
          difficulty: input?.difficulty,
          host: { name: { contains: input?.search } },
          date: { lt: currDate },
        };
      }
      const items = await ctx.prisma.class.findMany({
        take: input.limit,
        skip: input.limit * (input.page - 1),
        orderBy: {
          createdAt: "asc",
        },
        where,
        select: {
          ...defaultClassSelect,
          participant: {
            select: {
              user: {
                select: { name: true },
              },
            },
          },
          host: { select: { image: true, name: true, id: true } },
          _count: {
            select: {
              participant: true,
            },
          },
        },
      });
      //for pagination - have to do a seperate query for this in prisma
      const count = await ctx.prisma.class.count({
        where,
      });
      return {
        items,
        count,
      };
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
  getParticipantsByClass: publicProcedure
    .input(z.object({ classId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.participant.findMany({
        where: { classId: input.classId },
      });
    }),
  getSingleClass: publicProcedure
    .input(z.object({ classId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.class.findUnique({
        where: { id: input.classId },
        select: {
          ...defaultClassSelect,
          participant: {
            select: {
              user: {
                select: { name: true, id: true, image: true },
              },
            },
          },
          _count: {
            select: {
              participant: true,
            },
          },
          host: { select: { image: true, name: true, id: true } },
        },
      });
    }),
  getClassByUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.participant.findMany({
        where: { userId: input.id },
        select: {
          class: {
            select: {
              ...defaultClassSelect,
              _count: { select: { participant: true } },
              host: {
                select: { name: true, image: true, id: true },
              },
            },
          },
        },
      });
    }),
  getClassesByInstructor: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.class.findMany({
        where: { host: { id: input.id } },
        select: {
          ...defaultClassSelect,
          _count: { select: { participant: true } },
          host: {
            select: { name: true, image: true, id: true },
          },
        },
      });
    }),
  addComment: protectedProcedure
    .input(z.object({ classId: z.string(), text: z.string().max(100) }))
    .mutation(async ({ ctx, input }) => {
      const id = ctx.session.user.id;
      const dataWithId = { userId: id, ...input };
      return ctx.prisma.comment.create({ data: dataWithId });
    }),
  getComments: publicProcedure
    .input(z.object({ classId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: { classId: input.classId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          text: true,
          createdAt: true,
          user: { select: { name: true, image: true } },
        },
      });
    }),
  //Add some metric to feature by or add a featured column to classes
  getFeaturedClasses: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.class.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        ...defaultClassSelect,
        host: { select: { image: true, name: true, id: true } },
        _count: { select: { participant: true } },
      },
    });
  }),
});
