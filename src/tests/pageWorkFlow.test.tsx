import App from "../App";
import { render, screen, waitFor } from "../pages/utils/react-test-util";
import userEvent from "@testing-library/user-event";

describe("Order Page WorkFlow", () => {
  it("should show Order Options Page", () => {
    render(<App />);
    const designYourSundayPage = screen.getByText(/design your sundae!/i);

    const orderSundae = screen.getByRole("button", { name: "Order Sundae" });

    expect(designYourSundayPage).toBeInTheDocument();
    expect(orderSundae).toBeInTheDocument();
  });

  it("should show Order Summary Page when click Order Sundae button", async () => {
    const user = userEvent.setup();
    render(<App />);
    const orderSundae = screen.getByRole("button", { name: "Order Sundae" });
    expect(orderSundae).toBeInTheDocument();

    const hotFugeTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    await user.click(hotFugeTopping);
    await user.click(orderSundae);

    await waitFor(() => {
      const orderSummaryTitle = screen.getByText(/order summary/i);
      expect(orderSummaryTitle).toBeInTheDocument();
    });
  });

  it("should show Order Entry Alert when click Order Sundae button without selecting any toopings or scoops", async () => {
    const user = userEvent.setup();
    render(<App />);
    const orderSundae = screen.getByRole("button", { name: "Order Sundae" });
    expect(orderSundae).toBeInTheDocument();

    await user.click(orderSundae);

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  });

  it("shoud go to the Completed Page when click in confirm Order in Summary and Create a new order page", async () => {
    const user = userEvent.setup();
    render(<App />);

    const orderSundae = screen.getByRole("button", { name: "Order Sundae" });
    expect(orderSundae).toBeInTheDocument();

    const hotFugeTopping = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });

    userEvent.click(hotFugeTopping);
    userEvent.click(orderSundae);

    const checkBoxTermsAndCondition = await screen.findByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    });

    expect(checkBoxTermsAndCondition).toBeInTheDocument();
    await user.click(checkBoxTermsAndCondition);

    expect(checkBoxTermsAndCondition).toBeChecked();

    const confirmOrderButton = await screen.findByRole("button", {
      name: /confirm order/i,
    });

    expect(confirmOrderButton).toBeEnabled();

    userEvent.click(confirmOrderButton);

    await waitFor(() => {
      const completedPageTitle = screen.getByText(/thank you/i);
      expect(completedPageTitle).toBeInTheDocument();
    });

    const createNewOrderButton = screen.getByRole("button", {
      name: /create new order/i,
    });
    expect(createNewOrderButton).toBeInTheDocument();

    await user.click(createNewOrderButton);
    const designYourSundayPage = screen.getByText(/design your sundae!/i);

    expect(designYourSundayPage).toBeInTheDocument();

    const grandTotal = screen.getByText("Grand Total", { exact: false });

    expect(grandTotal).toHaveTextContent("0.00");
  });
});
