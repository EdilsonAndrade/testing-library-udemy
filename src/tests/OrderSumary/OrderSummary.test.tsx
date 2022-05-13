import { screen, render } from "../../../src/pages/utils/react-test-util";
import { OrderSummary } from "../../pages/OrderSummary";

describe("Order Summary", () => {
  it("should list two scoops", async () => {
    render(<OrderSummary typeOfOrder="scoops" />);

    const scoops = (await screen.findAllByRole("img", {
      name: /scoops$/i,
    })) as HTMLImageElement[];

    expect(scoops).toHaveLength(2);

    const altText = scoops.map((s: HTMLImageElement) =>
      s.alt.replace(" scoops", "")
    );

    expect(altText).toEqual(["Vanilla", "Chocolate"]);
  });

  it("should list three toppings", async () => {
    render(<OrderSummary typeOfOrder="toppings" />);

    const toppings = (await screen.findAllByRole("img", {
      name: /toppings$/i,
    })) as HTMLImageElement[];

    expect(toppings).toHaveLength(3);

    const altText = toppings.map((t) => t.alt.replace(" toppings", ""));

    expect(altText).toEqual(["Cherries", "M&Ms", "Hot fudge"]);
  });
});
