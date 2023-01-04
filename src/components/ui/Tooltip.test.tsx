import React from "react";
import { render, screen } from "@testing-library/react";
import Tooltip from "./Tooltip";

//DOESNT WORK WITH CSS/TAILWINDCSS?

test("Tooltip component displays text when hovered over", () => {
  render(
    <Tooltip text="This is a tooltip">
      <button>Hover over me</button>
    </Tooltip>
  );

  // Tooltip text is not visible initially
  expect(screen.queryByText("This is a tooltip")).not.toBeVisible();

  // Tooltip text becomes visible when hovered over
  const button = screen.getByRole("button");
  button.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
  expect(screen.getByText("This is a tooltip")).toBeInTheDocument();

  // Tooltip text becomes hidden when mouse leaves
  button.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
  expect(screen.queryByText("This is a tooltip")).not.toBeVisible();
});
