import { inboxPlacement } from 'src/pages';
import App from 'src/components/layout/App';
import { hasGrants } from 'src/helpers/conditions';

export default [
  {
    path: '/inbox-placement/seedlist',
    component: inboxPlacement.SeedListPage,
    layout: App,
    condition: hasGrants('inbox-placement/manage'),
    title: 'Inbox Placement Tests',
    supportDocSearch: 'inbox placement'
  },
  {
    path: '/inbox-placement/details/:id/:tab?',
    component: inboxPlacement.TestDetailsPage,
    layout: App,
    condition: hasGrants('inbox-placement/manage'),
    title: 'Inbox Placement',
    supportDocSearch: 'inbox placement'
  },
  {
    path: '/inbox-placement',
    component: inboxPlacement.TestListPage,
    layout: App,
    condition: hasGrants('inbox-placement/manage'),
    title: 'Inbox Placement Tests',
    supportDocSearch: 'inbox placement'
  }];
