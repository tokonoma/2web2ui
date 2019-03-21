import { formatFullNumber } from 'src/helpers/units';

export const IP_WARMUP_STAGES = [
  { name: 'Stage 1', id: 1, volume: formatFullNumber(200) },
  { name: 'Stage 2', id: 2, volume: formatFullNumber(500) },
  { name: 'Stage 3', id: 3, volume: formatFullNumber(1000) },
  { name: 'Stage 4', id: 4, volume: formatFullNumber(2000) },
  { name: 'Stage 5', id: 5, volume: formatFullNumber(5000) },
  { name: 'Stage 6', id: 6, volume: formatFullNumber(10000) },
  { name: 'Stage 7', id: 7, volume: formatFullNumber(20000) },
  { name: 'Stage 8', id: 8, volume: formatFullNumber(40000) },
  { name: 'Stage 9', id: 9, volume: formatFullNumber(100000) },
  { name: 'Stage 10', id: 10, volume: formatFullNumber(250000) },
  { name: 'Stage 11', id: 11, volume: formatFullNumber(500000) },
  { name: 'Stage 12', id: 12, volume: formatFullNumber(1000000) },
  { name: 'Stage 13', id: 13, volume: formatFullNumber(2000000) },
  { name: 'Stage 14', id: 14, volume: formatFullNumber(5000000) },
  { name: 'Stage 15', id: 15, volume: formatFullNumber(10000000) },
  { name: 'Stage 16', id: 16, volume: formatFullNumber(20000000) },
  { name: 'Stage 17', id: 17, volume: formatFullNumber(40000000) },
  { name: 'Stage 18', id: 18, volume: formatFullNumber(80000000) },
  { name: 'Stage 19', id: 19, volume: formatFullNumber(160000000) },
  { name: 'Stage 20', id: 20, volume: formatFullNumber(320000000) }
];
