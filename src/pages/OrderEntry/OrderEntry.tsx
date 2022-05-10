import React from "react";
import { OrderSummary } from "../OrderSummary";

export const OrderEntry = () => {
  return (
    <>
      <OrderSummary typeOfOrder="scoops" />
      <OrderSummary typeOfOrder="toppings" />
    </>
  );
};
