import { RECIPIENT_TIERS } from 'src/constants';
import { formatCurrency } from 'src/helpers/units';

const totalRVCost = (volume = 0) => {
  let totalCost = 0;

  RECIPIENT_TIERS.forEach(({ volumeMax, volumeMin, cost }) => {
    const tierCost = Math.max(Math.min(volumeMax, volume) - volumeMin, 0) * cost;
    totalCost += tierCost;
  });
  return formatCurrency(totalCost);
};

export default totalRVCost;
