import { createSelector } from 'reselect';
import { formatDateTime } from '../helpers/date';

const getIncidents = state => state.blacklist.incidents;
const getMonitors = state => state.blacklist.monitors;

export const selectIncidentsList = createSelector([getIncidents], incidents =>
  incidents.map(incident => ({
    ...incident,
    occurred_at_timestamp: incident.occurred_at ? Date.parse(incident.occurred_at) : 0,
    occurred_at_formatted: incident.occurred_at ? formatDateTime(incident.occurred_at) : null,
  })),
);

export const selectBlacklistedCount = createSelector([getMonitors], monitors =>
  monitors.reduce(
    (totalBlacklistCount, monitor) => totalBlacklistCount + monitor.active_listing_count,
    0,
  ),
);
