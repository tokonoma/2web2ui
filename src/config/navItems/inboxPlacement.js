import { Inbox } from '@sparkpost/matchbox-icons/matchbox-icons';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';

export default {
  divider: true,
  label: 'Inbox Placement',
  to: '/inbox-placement',
  tag: 'labs',
  icon: Inbox,
  condition: hasAccountOptionEnabled('inbox_placement')
};
