import { blacklist } from 'src/pages';
import App from 'src/components/layout/App';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
export default [
  {
    path: '/blacklist/incidents',
    component: blacklist.IncidentsPage,
    layout: App,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    title: 'Blacklist Incidents',
    supportDocSearch: 'blacklist',
  },
  {
    path: '/blacklist/watchlist/add',
    component: blacklist.WatchlistAddPage,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    layout: App,
    title: 'Add to Watch List',
    supportDocSearch: 'blacklist',
  },
  {
    path: '/blacklist/incidents/:id',
    component: blacklist.IncidentDetailsPage,
    condition: hasAccountOptionEnabled('blacklist_monitors'),
    layout: App,
    title: 'Blacklisting Incident',
    supportDocSearch: 'blacklist',
  },
];
