import { toCollection } from 'src/helpers/object';

const spamTrapHitTypes = {
  trap_hits_parked: {
    fill: '#50CFDA',
    label: 'Parked'
  },
  trap_hits_recycled: {
    fill: '#29B9C7',
    label: 'Recycled'
  },
  trap_hits_typo: {
    fill: '#1A838B',
    label: 'Typo'
  }
};

export const spamTrapHitTypesCollection = toCollection(spamTrapHitTypes);

export default spamTrapHitTypes;
