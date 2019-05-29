import { hasUiOption } from 'src/helpers/conditions/account';
import { TemplateOutlineFill } from '@sparkpost/matchbox-icons';

const campaignNavItems = [
  {
    label: 'Templates',
    to: '/templatesv2'
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
  condition: hasUiOption('templatesV2'),
  children: campaignNavItems
};

