import { rekey, toCollection } from 'src/helpers/object';

const spamTrapHitTypes = {
  trap_hits_parked: {
    fill: '#50CFDA',
    label: 'Parked',
    description: `
      This is an email address from a domain hosted by a parked domain provider. These addresses
      can point to list quality issues but do not affect your reputation.
    `
  },
  trap_hits_recycled: {
    fill: '#29B9C7',
    label: 'Recycled',
    description: `
      An email address that once was a real address, but now is a spam trap. These addresses signal
      that you should clean out old unengaged recipients.
    `
  },
  trap_hits_typo: {
    fill: '#1A838B',
    label: 'Typo',
    description: `
      This is an email address from a domain that looks like a real mailbox provider, like
      gmal.com. These addresses signal that you should improve your list acquisition practices.
    `
  }
};

export const spamTrapHitTypesCollection = toCollection(spamTrapHitTypes);
export const spamTrapHitTypesByLabel = rekey(spamTrapHitTypes, 'label');

export default spamTrapHitTypes;
