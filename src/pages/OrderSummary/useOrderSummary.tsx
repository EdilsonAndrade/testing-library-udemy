import { useEffect, useContext } from "react";
import { createContext, useState } from "react";
import { scoopsPrice, toppingPrice } from "../../constants";
import { TypeOfOrder } from "../common/types";

interface Options {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
}
interface Total {
  subTotalScoops: number;
  subTotalToppings: number;
  total: number;
}
interface OrderSummaryData {
  options: Options;
  totals: Total;
  updateOptionsItem(
    name: string,
    value: string,
    typeOfOrder: TypeOfOrder
  ): void;
}

const OrderSummaryContext = createContext({} as OrderSummaryData);

const OrderSummaryProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const [totals, setTotals] = useState({
    subTotalScoops: 0,
    subTotalToppings: 0,
    total: 0,
  });

  const updateOptionsItem = (
    name: string,
    value: string,
    typeOfOrder: TypeOfOrder
  ) => {
    const createdOptions = { ...options };
    const optionsMap = options[typeOfOrder];
    optionsMap.set(name, parseInt(value));
    setOptions(createdOptions);
  };

  useEffect(() => {
    let subTotalScoops = 0;
    let subTotalToppings = 0;
    let total = 0;
    options.scoops.forEach((value, key, map) => {
      subTotalScoops += value * scoopsPrice;
    });

    options.toppings.forEach((value, key, map) => {
      subTotalToppings += value * toppingPrice;
    });

    total = subTotalToppings + subTotalToppings;

    setTotals({
      subTotalScoops,
      subTotalToppings,
      total,
    });
  }, [options]);
  return (
    <OrderSummaryContext.Provider
      value={{
        options,
        updateOptionsItem,
        totals,
      }}
    >
      {children}
    </OrderSummaryContext.Provider>
  );
};

function useOrderSummary(): OrderSummaryData {
  const context = useContext(OrderSummaryContext);
  if (Object.entries(context).length === 0) {
    throw new Error("A component should be within OrderSummaryProvider");
  }

  return context;
}

export { OrderSummaryProvider, useOrderSummary };
