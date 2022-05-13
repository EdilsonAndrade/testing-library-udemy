import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { OrderSummaryProvider } from "../OrderSummary/useOrderSummary";

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: OrderSummaryProvider, ...options });

export * from "@testing-library/react";

export { renderWithContext as render };
