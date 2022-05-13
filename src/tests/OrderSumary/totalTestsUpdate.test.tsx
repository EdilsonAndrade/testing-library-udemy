import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderSummary } from "../../pages/OrderSummary";
import { OrderSummaryProvider } from "../../pages/OrderSummary/useOrderSummary";

it("should show the total value when I add a scoop", async () => {
  render(<OrderSummary typeOfOrder="scoops" />, {
    wrapper: OrderSummaryProvider,
  });
  const user = userEvent.setup();

  const scoopsSubTotal = await screen.findByText("Scoops total $", {
    exact: false,
  });

  expect(scoopsSubTotal).toHaveTextContent("0.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  expect(chocolateInput).toBeInTheDocument();
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubTotal).toHaveTextContent("6.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  expect(vanillaInput).toBeInTheDocument();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubTotal).toHaveTextContent("9.00");
});
