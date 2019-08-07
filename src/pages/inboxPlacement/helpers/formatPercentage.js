export default function formatPercentage(value) {
  const pctValue = (value * 100).toFixed(1);
  const formattedPercentage = pctValue < 10 ? `0${pctValue}` : pctValue;
  return `${formattedPercentage}%`;
}
