import React from "react";
import { OrderSummaryProvider } from "./pages/OrderSummary/useOrderSummary";
import { OrderEntry } from "./pages/OrderEntry";

const App = () => {
  return (
    <OrderSummaryProvider>
      <OrderEntry />
    </OrderSummaryProvider>
  );
};

export default App;
