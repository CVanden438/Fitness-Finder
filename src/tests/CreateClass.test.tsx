/**
 * @jest-environment jsdom
 */

import { render, waitFor, userEvent } from "./utils";
import FitnessClassForm from "../pages/createclass";
import { screen } from "@testing-library/react";
describe("Create Class Form", () => {
  describe("with no inputs", () => {
    it("shows errors", async () => {
      const { getByText, getByTestId } = render(<FitnessClassForm />);
      const submitButton = getByText(/create fitness class/i);
      await userEvent.click(submitButton);
      const error = getByTestId("duration-error");
      await waitFor(() => {
        expect(error).toBeInTheDocument();
      });
    });
  });
});
