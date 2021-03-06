import { reports, signals } from 'src/pages';
import App from 'src/components/layout/App';
import { hasGrants } from 'src/helpers/conditions';
import { hasAccountOptionEnabled, isAccountUiOptionSet } from 'src/helpers/conditions/account';

export default [
  {
    path: '/reports',
    redirect: '/reports/summary',
    category: 'Signals Analytics',
    subcategory: 'Summary',
  },
  {
    path: '/reports/summary',
    component: reports.SummaryPage,
    layout: App,
    title: 'Summary Report | Signals Analytics',
    supportDocSearch: 'reporting',
    category: 'Signals Analytics',
    subcategory: 'Summary',
  },
  {
    path: '/reports/bounce',
    component: reports.BouncePage,
    layout: App,
    title: 'Bounce Report | Signals Analytics',
    supportDocSearch: 'bounce',
    category: 'Signals Analytics',
    subcategory: 'Bounce',
  },
  {
    path: '/reports/rejections',
    component: reports.RejectionPage,
    layout: App,
    title: 'Rejections Report | Signals Analytics',
    supportDocSearch: 'reject',
    category: 'Signals Analytics',
    subcategory: 'Rejections',
  },
  {
    path: '/reports/accepted',
    component: reports.AcceptedPage,
    layout: App,
    title: 'Accepted Report | Signals Analytics',
    supportDocSearch: 'accept',
    category: 'Signals Analytics',
    subcategory: 'Accepted',
  },
  {
    path: '/reports/delayed',
    component: reports.DelayPage,
    layout: App,
    title: 'Delay Report | Signals Analytics',
    supportDocSearch: 'delay',
    category: 'Signals Analytics',
    subcategory: 'Delayed',
  },
  {
    path: '/reports/engagement',
    component: reports.EngagementPage,
    layout: App,
    title: 'Engagement Report | Signals Analytics',
    supportDocSearch: 'engagement',
    category: 'Signals Analytics',
    subcategory: 'Engagement',
  },
  {
    path: '/reports/message-events',
    component: reports.MessageEventsPage,
    layout: App,
    title: 'Events Search | Events',
    supportDocSearch: 'event',
    category: 'Events',
  },
  {
    path: '/reports/message-events/details/:messageId/:eventId?',
    component: reports.EventPage,
    layout: App,
    title: 'Message History | Events',
    supportDocSearch: 'event',
    category: 'Events',
  },
  {
    path: '/signals',
    redirect: '/signals/health-score',
    category: 'Signals Analytics',
    subcategory: 'Health Score',
  },
  {
    path: '/signals/health-score',
    component: signals.HealthScoreDashboard,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Health Score | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Health Score',
  },
  {
    path: '/signals/spam-traps',
    component: signals.SpamTrapDashboard,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Spam Trap Monitoring | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Spam Traps',
  },
  {
    path: '/signals/engagement',
    component: signals.EngagementRecencyDashboard,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Engagement Recency | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Engagement Recency',
  },
  {
    path: '/signals/health-score/:facet/:facetId',
    component: signals.HealthScorePage,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Subaccount | Health Score | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Health Score',
  },
  {
    path: '/signals/health-scoreV3/:facet/:facetId',
    component: signals.HealthScorePageV3,
    condition: isAccountUiOptionSet('allow_health_score_v3'),
    layout: App,
    title: 'Health Score | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Health Score',
  },
  {
    path: '/signals/spam-traps/:facet/:facetId',
    component: signals.SpamTrapPage,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Spam Trap Monitoring | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Spam Traps',
  },
  {
    path: '/signals/engagement/cohorts/:facet/:facetId',
    component: signals.EngagementRecencyPage,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Engagement Details | Engagement Recency | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Engagement Recency',
  },
  {
    path: '/signals/engagement/engagement-rate/:facet/:facetId',
    component: signals.EngagementRateByCohortPage,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Engagement Rate | Signals Analytics',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Engagement Recency',
  },
  {
    path: '/signals/engagement/unsubscribes/:facet/:facetId',
    component: signals.UnsubscribeRateByCohortPage,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Signals',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Engagement Recency',
  },
  {
    path: '/signals/engagement/complaints/:facet/:facetId',
    component: signals.ComplaintsByCohortPage,
    condition: hasGrants('signals/manage'),
    layout: App,
    title: 'Signals',
    supportDocSearch: 'signals',
    category: 'Signals Analytics',
    subcategory: 'Engagement Recency',
  },
  {
    path: '/signals/integration',
    component: signals.IntegrationPage,
    condition: hasAccountOptionEnabled('allow_events_ingest'),
    layout: App,
    title: 'Signals | Integration',
    supportDocSearch: 'signals',
    category: 'Configuration',
  },
];
