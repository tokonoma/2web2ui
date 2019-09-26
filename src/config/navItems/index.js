import {
  Home,
  InsertChart,
  Code,
  MailOutline,
  Language,
  Compare,
  NotificationsActive,
  Signal,
  VerifiedUser
} from '@sparkpost/matchbox-icons';
import { hasGrants } from 'src/helpers/conditions';
import campaign from './campaign';
import settings from './settings';
import inboxPlacement from './inboxPlacement';

export default [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: Home
  },
  {
    label: 'Reports',
    to: '/reports',
    icon: InsertChart,
    children: [
      {
        label: 'Summary',
        to: '/reports/summary'
      },
      {
        label: 'Bounce',
        to: '/reports/bounce'
      },
      {
        label: 'Rejections',
        to: '/reports/rejections'
      },
      {
        label: 'Accepted',
        to: '/reports/accepted'
      },
      {
        label: 'Delayed',
        to: '/reports/delayed'
      },
      {
        label: 'Engagement',
        to: '/reports/engagement'
      },
      {
        label: 'Events Search',
        to: '/reports/message-events',
        tag: 'new'
      }
    ]
  },
  {
    label: 'Signals',
    to: '/signals',
    icon: Signal,
    tag: 'new',
    children: [
      {
        label: 'Health Score',
        to: '/signals/health-score'
      },
      {
        label: 'Spam Traps',
        to: '/signals/spam-traps'
      },
      {
        label: 'Engagement Recency',
        to: '/signals/engagement'
      }
    ]
  },
  campaign,
  //TODO remove it in TR-1455
  {
    label: 'Templates',
    to: '/templates',
    icon: Code
  },
  //TODO remove it in TR-1455
  {
    label: 'A/B Testing',
    to: '/ab-testing',
    icon: Compare
  },
  {
    label: 'Lists',
    to: '/lists',
    icon: MailOutline,
    children: [
      {
        label: 'Recipient Lists',
        to: '/lists/recipient-lists'
      },
      {
        label: 'Suppressions',
        to: '/lists/suppressions'
      }
    ]
  },
  {
    label: 'Recipient Validation',
    // this route is a redirect, its condition is not correctly inherited, so this condition will
    // need to be manually kept up to date
    condition: hasGrants('recipient-validation/manage'),
    to: '/recipient-validation',
    icon: VerifiedUser,
    tag: 'new'
  },
  {
    label: 'Webhooks',
    to: '/webhooks',
    icon: Language
  },
  settings,
  {
    label: 'Alerts',
    to: '/alerts',
    tag: 'new',
    icon: NotificationsActive
  },
  //TODO remove it in TR-1455
  {
    label: 'Snippets',
    to: '/snippets',
    tag: 'labs',
    divider: true,
    icon: Code
  },
  inboxPlacement
];
