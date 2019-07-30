import { Inbox } from '@sparkpost/matchbox-icons/matchbox-icons';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';

export default {
  label: 'Inbox Placement',
  to: '/inbox-placement',
  tag: 'labs',
  icon: Inbox,
  condition: hasAccountOptionEnabled('inbox_placement')
  children: [
    {
      label: 'Seed List',
      to: '/inbox-placement/seedlist',
      tag: 'labs'
    }
  ]
};
