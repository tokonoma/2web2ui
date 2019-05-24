/* eslint-disable max-lines */

import { Home, InsertChart, Code, MailOutline, Language, Settings, Compare, NotificationsActive, Signal, FilterNone, VerifiedUser } from '@sparkpost/matchbox-icons';
import { hasUiOption } from 'src/helpers/conditions/account';

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
  {
    label: 'Campaigns',
    to: '/campaigns',
    icon: FilterNone,
    tag: 'new',
    condition: hasUiOption('templatesV2'),
    children: [
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
    ]
  },
  {
    label: 'Templates',
    to: '/templates',
    icon: Code
  },
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
    to: '/recipient-validation',
    icon: VerifiedUser,
    tag: 'new'
  },
  {
    label: 'Webhooks',
    to: '/webhooks',
    icon: Language
  },
  {
    label: 'Settings',
    to: '/account',
    icon: Settings,
    children: [
      {
        label: 'API Keys',
        to: '/account/api-keys'
      },
      {
        label: 'Subaccounts',
        to: '/account/subaccounts'
      },
      {
        label: 'SMTP Settings',
        to: '/account/smtp'
      },
      {
        label: 'Sending Domains',
        to: '/account/sending-domains'
      },

      {
        label: 'Tracking Domains',
        to: '/account/tracking-domains'
      },
      {
        label: 'IP Pools',
        to: '/account/ip-pools'
      }
    ]
  },
  {
    label: 'Alerts',
    to: '/alerts',
    tag: 'new',
    icon: NotificationsActive
  },
  {
    label: 'Snippets',
    to: '/snippets',
    tag: 'labs',
    divider: true,
    icon: Code
  }
];
