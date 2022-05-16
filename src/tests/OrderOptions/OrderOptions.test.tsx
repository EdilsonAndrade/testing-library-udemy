import { screen, render } from "../../pages/utils/react-test-util";
import { OrderOptions } from "../../pages/OrderOptions";

describe("Order Summary", () => {
  it("should list two scoops", async () => {
    render(<OrderOptions typeOfOrder="scoops" />);

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
    render(<OrderOptions typeOfOrder="toppings" />);

    const toppings = (await screen.findAllByRole("img", {
      name: /toppings$/i,
    })) as HTMLImageElement[];

    expect(toppings).toHaveLength(3);

    const altText = toppings.map((t) => t.alt.replace(" toppings", ""));

    expect(altText).toEqual(["Cherries", "M&Ms", "Hot fudge"]);
  });
});
