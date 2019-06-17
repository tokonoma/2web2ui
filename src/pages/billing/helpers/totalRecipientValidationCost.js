import { RECIPIENT_VALIDATION_TIERS } from 'src/constants';
import { formatCurrency } from 'src/helpers/units';

const totalRVCost = (volume = 0) => {

  const totalCost = RECIPIENT_VALIDATION_TIERS.reduce((acc, { volumeMax, volumeMin, cost }) => (
    acc + Math.max(Math.min(volumeMax, volume) - volumeMin, 0) * cost
  ), 0);

  return formatCurrency(totalCost);
};

export default totalRVCost;
