import { inboxPlacement } from 'src/pages';
import App from '../../components/layout/App';
import { hasGrants } from '../../helpers/conditions';

export default [{
  path: '/inbox-placement/seedlist',
  component: inboxPlacement.SeedListPage,
  layout: App,
  condition: hasGrants('inbox-placement/manage'),
  title: 'Inbox Placement Tests',
  supportDocSearch: 'inbox placement'
}];
