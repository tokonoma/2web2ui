import { TemplateOutlineFill } from '@sparkpost/matchbox-icons';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';

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
  icon: TemplateOutlineFill,
  condition: isAccountUiOptionSet('templatesV2'),
  children: campaignNavItems
};
