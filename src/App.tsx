import React, { useState } from "react";
import { OrderOptionsProvider } from "./pages/OrderOptions/useOrderOptions";
import { OrderEntry } from "./pages/OrderEntry";
import { Summary } from "./pages/Summary";
import { OrderComplete } from "./pages/OrderComplete";

const App = () => {
  const [orderStep, setOrderStep] = useState("");

  const renderPage = () => {
    switch (orderStep) {
      case "Review":
        return <Summary changePage={(e: string) => setOrderStep(e)} />;

      case "Completed":
        return <OrderComplete changePage={(e: string) => setOrderStep(e)} />;
      default:
        return <OrderEntry changePage={(e: string) => setOrderStep(e)} />;
    }
  };

  return <OrderOptionsProvider>{renderPage()}</OrderOptionsProvider>;
};

export default App;
