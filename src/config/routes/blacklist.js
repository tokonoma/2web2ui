import { blacklist } from 'src/pages';
import App from 'src/components/layout/App';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
export default [
  {
    path: '/blacklist',
    component: blacklist.IncidentsPage,
    layout: App,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    title: 'Blacklist Incidents',
    supportDocSearch: 'blacklist'
  }
];
