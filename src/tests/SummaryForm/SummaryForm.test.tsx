import { OrderSummary } from "../../pages/OrderSummary";
import { screen, fireEvent, render } from "@testing-library/react";

describe("Form flow test", () => {
  it("button should be disable and checkbox unchecked", () => {
    render(<OrderSummary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    const button = screen.getByRole("button", { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
  it("should enable button when checkbox is checked", () => {
    render(<OrderSummary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    const button = screen.getByRole("button", { name: /confirm order/i });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });

  it("should enable button when checkbox is checked and disable when checkobx is unchecked", () => {
    render(<OrderSummary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    const button = screen.getByRole("button", { name: /confirm order/i });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });
});
