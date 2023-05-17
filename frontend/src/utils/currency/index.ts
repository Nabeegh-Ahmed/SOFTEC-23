export const abbreviateCurrency = (value: number) => {
  // 100 -> 100
  // 1000 -> 1k
  // 10000 -> 10k etc.
  const SI_SYMBOL = ["", "K", "M", "B", "T"];
  const tier = (Math.log10(Math.abs(value)) / 3) | 0;
  if (tier === 0) return value.toFixed(2);
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;
  const formatted = scaled.toFixed(2) + suffix;
  return formatted;
};
