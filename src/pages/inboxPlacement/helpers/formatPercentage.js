export default function formatPercentage(value = null) {
  const pctValue = (value * 100).toFixed(1);
  const formattedPercentage = pctValue < 10 ? `0${pctValue}` : pctValue >= 100 ? 100 : pctValue;
  return `${formattedPercentage}%`;
}
