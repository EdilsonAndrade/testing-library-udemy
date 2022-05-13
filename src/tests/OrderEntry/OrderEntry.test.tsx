import {
  screen,
  render,
  waitFor,
} from "../../../src/pages/utils/react-test-util";
import { rest } from "msw";
import { OrderEntry } from "../../pages/OrderEntry";
import { server } from "../OrderSumary/mocks/server";

it("should show two alerts when calling scoops and toppings", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);
  await waitFor(async () => {
    const alert = await screen.findAllByRole("alert");

    expect(alert).toHaveLength(2);
  });
});
