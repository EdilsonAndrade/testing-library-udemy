import {
  screen,
  render,
  waitFor,
} from "../../../src/pages/utils/react-test-util";
import { rest } from "msw";
import { OrderEntry } from "../../pages/OrderEntry";
import { server } from "../OrderOptions/mocks/server";
import userEvent from "@testing-library/user-event";

it("should show two alerts when calling scoops and toppings", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry changePage={jest.fn()} />);
  await waitFor(async () => {
    const alert = await screen.findAllByRole("alert");

    expect(alert).toHaveLength(2);
  });
});

it("should show Loading while getting data from the server", async () => {
  render(<OrderEntry changePage={jest.fn()} />);

  const loadingComponent = screen.getAllByText("Loading...", { exact: false });

  expect(loadingComponent[0]).toBeInTheDocument();

  const scoopsChocolate = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  expect(scoopsChocolate).toBeInTheDocument();

  expect(loadingComponent[0]).not.toBeInTheDocument();
});

it("should show redBorder when scoops value are less than 0", async () => {
  const user = userEvent.setup();
  render(<OrderEntry changePage={jest.fn()} />);

  const scoopsChocolate = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(scoopsChocolate);
  await user.type(scoopsChocolate, "-1");

  expect(scoopsChocolate).toHaveClass("is-invalid");

  await user.clear(scoopsChocolate);
  await user.type(scoopsChocolate, "2");

  expect(scoopsChocolate).not.toHaveClass("is-invalid");
});

it("should not update scoops sub total for invalid values", async () => {
  const user = userEvent.setup();
  render(<OrderEntry changePage={jest.fn()} />);

  const scoopsChocolate = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(scoopsChocolate);
  await user.type(scoopsChocolate, "-1");

  const scoopsSubTotal = await screen.findByText("Scoops total", {
    exact: false,
  });

  expect(scoopsSubTotal).toHaveTextContent("0.00");
});
