/**
 * @jest-environment jsdom
 */

//tes only runs without getServerSideProps
import { render, waitFor, userEvent, getByTestId } from "./utils";
import FitnessClassForm from "../pages/createclass";
import { screen } from "@testing-library/react";
describe("Create Class Form", () => {
  describe("with no inputs", () => {
    it("shows errors", async () => {
      const { getByLabelText, getByRole, getByText, getAllByLabelText } =
        render(<FitnessClassForm />);
      const submitButton = getByText(/create fitness class/i);
      await userEvent.click(submitButton);
      const error = screen.getByTestId("duration-error");
      await waitFor(() => {
        expect(error).toBeInTheDocument();
      });
    });
  });
});
