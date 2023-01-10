/**
 * @jest-environment jsdom
 */
import Hover from "../components/ui/Hover";
import { render, waitFor, userEvent } from "./utils";

describe("Hover UI Component", () => {
  it("Doesn't appear initially", async () => {
    const { getByText, getByTestId } = render(<Hover text="hello" />);
    const hoverElement = getByTestId("hover");
    // await userEvent.hover(hoverElement);
    expect(hoverElement).not.toHaveClass("opacity-100");
  });
  it("Shows up when hovered", async () => {
    const { getByText, getByTestId } = render(<Hover text="hello" />);
    const hoverElement = getByTestId("hover");
    await userEvent.hover(hoverElement);
    expect(hoverElement).toHaveClass("opacity-100");
  });
});
