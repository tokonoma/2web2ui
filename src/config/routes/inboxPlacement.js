import inboxPlacementPages from 'src/pages/inboxPlacement';
import App from '../../components/layout/App';
import { hasGrants } from '../../helpers/conditions';

export default [{
  path: '/inbox-placement/seedlist',
  component: inboxPlacementPages.SeedListPage,
  layout: App,
  condition: hasGrants('inbox-placement/manage'),
  title: 'Inbox Placement Test',
  supportDocSearch: 'inbox placement'
}];
