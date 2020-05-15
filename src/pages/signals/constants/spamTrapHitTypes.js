import { rekey, toCollection } from 'src/helpers/object';
import { tokens } from '@sparkpost/design-tokens-hibana';

// TODO: Remove multiple fill values when OG theme is removed
const spamTrapHitTypes = {
  trap_hits_parked: {
    OGFill: '#50CFDA',
    hibanaFill: tokens.color_blue_900,
    label: 'Parked',
    description: `
      This is an email address from a domain hosted by a parked domain provider. These addresses
      can point to list quality issues but do not affect your reputation.
    `,
  },
  trap_hits_recycled: {
    OGFill: '#29B9C7',
    hibanaFill: tokens.color_blue_700,
    label: 'Recycled',
    description: `
      An email address that once was a real address, but now is a spam trap. These addresses signal
      that you should clean out old unengaged recipients.
    `,
  },
  trap_hits_typo: {
    OGFill: '#1A838B',
    hibanaFill: tokens.color_blue_500,
    label: 'Typo',
    description: `
      This is an email address from a domain that looks like a real mailbox provider, like
      gmal.com. These addresses signal that you should improve your list acquisition practices.
    `,
  },
};

export const spamTrapHitTypesCollection = toCollection(spamTrapHitTypes);
export const spamTrapHitTypesByLabel = rekey(spamTrapHitTypes, 'label');

export default spamTrapHitTypes;
