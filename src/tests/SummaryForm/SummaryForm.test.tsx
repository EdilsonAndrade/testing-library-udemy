import { Summary } from "../../pages/Summary";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Form flow test", () => {
  it("button should be disable and checkbox unchecked", () => {
    render(<Summary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    const button = screen.getByRole("button", { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
  it("should enable button when checkbox is checked", async () => {
    render(<Summary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    const button = screen.getByRole("button", { name: /confirm order/i });

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });

  it("should enable button when checkbox is checked and disable when checkobx is unchecked", async () => {
    render(<Summary />);
    const checkbox = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    const button = screen.getByRole("button", { name: /confirm order/i });

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });
  it("popup should not exist on form until user hover terms and condition and disappear when popup is unhover", async () => {
    const user = userEvent.setup();
    render(<Summary />);

    const nullPopover = screen.queryByText(
      /no ice crem will actually be delivered/i
    );

    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditionLabel = screen.getByText(/terms and conditions/i);
    expect(termsAndConditionLabel).toBeInTheDocument();

    await user.hover(termsAndConditionLabel);

    const popOver = screen.queryByText(
      /no ice crem will actually be delivered/i
    );
    expect(popOver).toBeInTheDocument();

    await user.unhover(termsAndConditionLabel);
    const unHoverPopOver = screen.getByText(
      /no ice crem will actually be delivered/i
    );
    await waitFor(() => expect(unHoverPopOver).not.toBeInTheDocument());
  });
});
