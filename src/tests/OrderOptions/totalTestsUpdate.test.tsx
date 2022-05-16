import { render, screen } from "../../pages/utils/react-test-util";
import userEvent from "@testing-library/user-event";
import { OrderOptions } from "../../pages/OrderOptions";
import { OrderEntry } from "../../pages/OrderEntry";

it("should show the subtotal value when I add a scoop", async () => {
  render(<OrderOptions typeOfOrder="scoops" />);
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

it("should should show the subtotalValue when I check a topping", async () => {
  const user = userEvent.setup();

  render(<OrderOptions typeOfOrder="toppings" />);

  const toppingSubTotal = await screen.findByText("Toppings total $", {
    exact: false,
  });

  expect(toppingSubTotal).toHaveTextContent("0.00");

  const toppingCheck = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  expect(toppingCheck).not.toBeChecked();

  await user.click(toppingCheck);

  expect(toppingCheck).toBeChecked();
  expect(toppingSubTotal).toHaveTextContent("1.5");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);

  expect(cherriesCheckbox).toBeChecked();
  expect(toppingSubTotal).toHaveTextContent("3.00");
});

it("should have total = to 7.5", async () => {
  const user = userEvent.setup();
  render(
    <>
      <OrderEntry />
    </>
  );

  const grandTotal = await screen.findAllByText("Grand Total", {
    exact: false,
  });

  expect(grandTotal[0]).toHaveTextContent("0.00");

  const toppingOptions = await screen.findAllByRole("checkbox", {
    name: "M&Ms",
  });

  await user.click(toppingOptions[0]);

  const scoopsOptions = await screen.findAllByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(scoopsOptions[0]);
  await user.type(scoopsOptions[0], "2");

  expect(grandTotal[0]).toHaveTextContent("7.5");
});
