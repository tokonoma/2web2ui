import { createSelector } from 'reselect';
import { formatDateTime } from '../helpers/date';
import moment from 'moment';

const getIncident = state => state.blacklist.incident || {};

const getIncidents = state => state.blacklist.incidents;
const getMonitors = state => state.blacklist.monitors;

const getIncidentsForResource = state => state.blacklist.incidentsForResource || [];

const getIncidentsForBlacklist = state => state.blacklist.incidentsForBlacklist || [];

const getHistoricalIncidents = state => state.blacklist.historicalIncidents || [];

const enrichIncident = incident => ({
  ...incident,
  occurred_at_timestamp: incident.occurred_at ? Date.parse(incident.occurred_at) : 0,
  occurred_at_formatted: incident.occurred_at ? formatDateTime(incident.occurred_at) : null,
  resolved_at_timestamp: incident.resolved_at ? Date.parse(incident.resolved_at) : 0,
  resolved_at_formatted: incident.resolved_at ? formatDateTime(incident.resolved_at) : null,
  days_listed: moment().diff(moment(incident.occurred_at), 'days'),
});

export const selectIncident = createSelector([getIncident], incident => enrichIncident(incident));

export const selectIncidentsList = createSelector([getIncidents], incidents =>
  incidents.map(incident => enrichIncident(incident)),
);

export const selectRelatedIncidentsForResource = createSelector(
  [getIncidentsForResource, getIncident],
  (incidents, currentIncident) =>
    incidents
      .filter(incident => incident.id !== currentIncident.id)
      .map(incident => enrichIncident(incident))
      .slice(0, 3),
);

export const selectRelatedIncidentsForBlacklist = createSelector(
  [getIncidentsForBlacklist, getIncident],
  (incidents, currentIncident) =>
    incidents
      .filter(incident => incident.id !== currentIncident.id)
      .map(incident => enrichIncident(incident))
      .slice(0, 3),
);

export const selectHistoricalIncidents = createSelector(
  [getHistoricalIncidents, getIncident],
  (incidents, currentIncident) =>
    incidents
      .filter(incident => incident.id !== currentIncident.id)
      .map(incident => enrichIncident(incident))
      .slice(0, 6),
);

export const selectBlacklistedCount = createSelector([getMonitors], monitors =>
  monitors.reduce(
    (totalBlacklistCount, monitor) => totalBlacklistCount + monitor.active_listing_count,
    0,
  ),
);
