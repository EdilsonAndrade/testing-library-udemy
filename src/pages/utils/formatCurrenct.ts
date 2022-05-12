export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);
};
