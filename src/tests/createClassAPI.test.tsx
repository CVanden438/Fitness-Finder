/**
 * @jest-environment node
 */
import { appRouter } from "../server/trpc/router/_app";
import { createContextInner } from "../server/trpc/context";
import { RouterInputs } from "../utils/trpc";
import { Session } from "next-auth";
import { Class } from "@prisma/client";
const date = new Date();
export const mockSession: Session = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: {
    role: "INSTRUCTOR",
    email: "peter@web.net",
    id: "1",
    image: "image.com",
    name: "Bob Bill",
  },
};
//NO TEST DB SETUP
describe("Create Class - Component Test", () => {
  it("should allow instructor to add a new class", async () => {
    const ctx = await createContextInner({
      session: mockSession,
    });
    const caller = appRouter.createCaller(ctx);
    const input: RouterInputs["class"]["addClass"] = {
      capacity: 1,
      category: "Yoga",
      date: `${date}`,
      difficulty: "beginner",
      duration: 20,
      price: 20,
      time: "12:01",
      title: "test",
      description: "test",
    };
    const newclass = await caller.class.addClass(input);
    expect(newclass.description).toEqual("test");
  });
});
