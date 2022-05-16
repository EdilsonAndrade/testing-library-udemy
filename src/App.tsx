import React from "react";
import { OrderOptionsProvider } from "./pages/OrderOptions/useOrderOptions";
import { OrderEntry } from "./pages/OrderEntry";

const App = () => {
  return (
    <OrderOptionsProvider>
      <OrderEntry />
    </OrderOptionsProvider>
  );
};

export default App;
