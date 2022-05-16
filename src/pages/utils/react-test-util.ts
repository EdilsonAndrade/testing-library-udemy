import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { OrderOptionsProvider } from "../OrderOptions/useOrderOptions";

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: OrderOptionsProvider, ...options });

export * from "@testing-library/react";

export { renderWithContext as render };
