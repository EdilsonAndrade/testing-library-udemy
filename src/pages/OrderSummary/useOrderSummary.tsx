import { useContext } from "react";
import { createContext, useState } from "react";
import { TypeOfOrder } from "../common/types";

interface Options {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
}
interface OrderSummaryData {
  options: Options;
  updateOptionsItem(
    name: string,
    value: string,
    typeOfOrder: TypeOfOrder
  ): void;
}

const OrderSummaryContext = createContext({} as OrderSummaryData);

const OrderSummaryProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const updateOptionsItem = (
    name: string,
    value: string,
    typeOfOrder: TypeOfOrder
  ) => {
    const createdOptions = options;

    const option = createdOptions[typeOfOrder];

    option.set(name, parseInt(value));

    setOptions(createdOptions);
  };

  return (
    <OrderSummaryContext.Provider
      value={{
        options,
        updateOptionsItem,
      }}
    >
      {children}
    </OrderSummaryContext.Provider>
  );
};

function useOrderSummary(): OrderSummaryData {
  const context = useContext(OrderSummaryContext);
  if (!context) {
    throw new Error("A component should be within OrderSummaryProvider");
  }

  return context;
}

export { OrderSummaryProvider, useOrderSummary };
