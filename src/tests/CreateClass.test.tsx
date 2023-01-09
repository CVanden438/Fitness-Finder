/**
 * @jest-environment node
 */
import { appRouter } from "../server/trpc/router/_app";
import { createContextInner } from "../server/trpc/context";
import { RouterInputs } from "../utils/trpc";
const date = new Date();
describe("Create Class - Component Test", () => {
  it("should allow instructor to add a new class", async () => {
    const ctx = await createContextInner({
      session: null,
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
    const byId = await caller.class.getSingleClass({ classId: newclass.id });
    expect(byId).toMatchObject(input);

    // const title = await rendered.("Capacity:");
    // await user.type(title, "2");
    // expect(title.value).toBe("2");
    // const addClassBtn = await rendered.findByRole("button");
    // const error = await rendered.findByTestId("error");
    // console.log(error);
    // user.click(addClassBtn);
  });
});

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import Tooltip from "./Tooltip";

// //DOESNT WORK WITH CSS/TAILWINDCSS?

// test("Tooltip component displays text when hovered over", () => {
//   render(
//     <Tooltip text="This is a tooltip">
//       <button>Hover over me</button>
//     </Tooltip>
//   );

//   // Tooltip text is not visible initially
//   expect(screen.queryByText("This is a tooltip")).not.toBeVisible();

//   // Tooltip text becomes visible when hovered over
//   const button = screen.getByRole("button");
//   button.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
//   expect(screen.getByText("This is a tooltip")).toBeInTheDocument();

//   // Tooltip text becomes hidden when mouse leaves
//   button.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
//   expect(screen.queryByText("This is a tooltip")).not.toBeVisible();
// });
