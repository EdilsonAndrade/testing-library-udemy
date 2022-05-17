import { useEffect, useContext } from "react";
import { useCallback } from "react";
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
  totals: Total;
  resetOrder(): void;
  updateOptionsItem(
    name: string,
    value: string,
    typeOfOrder: TypeOfOrder
  ): void;
}

const OrderSummaryContext = createContext({} as OrderSummaryData);

const OrderOptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const [totals, setTotals] = useState({
    subTotalScoops: 0,
    subTotalToppings: 0,
    total: 0,
  });

  const resetOrder = useCallback(() => {
    setOptions({
      scoops: new Map<string, number>(),
      toppings: new Map<string, number>(),
    });
  }, []);

  const updateOptionsItem = useCallback(
    (name: string, value: string, typeOfOrder: TypeOfOrder) => {
      const createdOptions = { ...options };
      const optionsMap = options[typeOfOrder];
      optionsMap.set(name, parseInt(value));
      setOptions(createdOptions);
    },
    [options]
  );

  useEffect(() => {
    let subTotalScoops = 0;
    let subTotalToppings = 0;
    let total = 0;
    options.scoops.forEach((value, key, map) => {
      subTotalScoops += (value > 0 ? value : 0) * scoopsPrice;
    });

    options.toppings.forEach((value, key, map) => {
      subTotalToppings += (value > 0 ? value : 0) * toppingPrice;
    });

    total = subTotalScoops + subTotalToppings;

    setTotals({
      subTotalScoops,
      subTotalToppings,
      total,
    });
  }, [options]);
  return (
    <OrderSummaryContext.Provider
      value={{
        updateOptionsItem,
        totals,
        resetOrder,
      }}
    >
      {children}
    </OrderSummaryContext.Provider>
  );
};

function useOrderOptions(): OrderSummaryData {
  const context = useContext(OrderSummaryContext);
  if (Object.entries(context).length === 0) {
    throw new Error("A component should be within OrderSummaryProvider");
  }

  return context;
}

export { OrderOptionsProvider, useOrderOptions };
