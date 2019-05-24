
import { hasUiOption } from 'src/helpers/conditions/account';
import { FilterNone } from '@sparkpost/matchbox-icons/matchbox-icons';

const campaignNavItems = [
  {
    label: 'Templates',
    to: '/templates'
  },
  {
    label: 'A/B Testing',
    to: '/ab-testing'
  },
  {
    label: 'Snippets',
    to: '/snippets',
    tag: 'labs'
  }
];

export default {
  label: 'Campaigns',
  to: '/campaigns',
  icon: FilterNone,
  condition: hasUiOption('templatesV2'),
  children: campaignNavItems
};

