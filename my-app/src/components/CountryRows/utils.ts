const numberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

export const formatNumber = (n?: number) => (n == null || !isFinite(n) ? "N/A" : numberFormatter.format(n));
