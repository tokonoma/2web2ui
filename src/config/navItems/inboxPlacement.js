import { Inbox } from '@sparkpost/matchbox-icons/matchbox-icons';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';

export default {
  label: 'Inbox Placement',
  to: '/inbox-placement',
  tag: 'preview',
  icon: Inbox,
  condition: hasAccountOptionEnabled('inbox_placement'),
};
