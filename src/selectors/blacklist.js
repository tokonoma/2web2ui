import { createSelector } from 'reselect';
import { formatDateTime } from '../helpers/date';
import moment from 'moment';

const getIncident = state => state.blacklist.incident || {};

const getIncidents = state => state.blacklist.incidents;
const getMonitors = state => state.blacklist.monitors;

const getIncidentsForResource = state => state.blacklist.incidentsForResource || [];

const getIncidentsForBlacklist = state => state.blacklist.incidentsForBlacklist || [];

const getHistoricalIncidents = state => state.blacklist.historicalIncidents || [];

const getIncidentError = state => state.blacklist.incidentError || false;

const getIncidentsForResourceError = state => state.blacklist.incidentsForResourceError || false;

const getHistoricalIncidentsError = state => state.blacklist.historicalIncidentsError || false;

const getIncidentsForBlacklistError = state => state.blacklist.incidentsForBlacklistError || false;

const getDaysListed = (resolvedDate, occurredDate) => {
  const resolvedMoment = resolvedDate === null ? moment() : moment(resolvedDate);
  return resolvedMoment.diff(moment(occurredDate), 'days') || 1;
};

const enrichIncident = incident => ({
  ...incident,
  occurred_at_timestamp: incident.occurred_at ? Date.parse(incident.occurred_at) : 0,
  occurred_at_formatted: incident.occurred_at ? formatDateTime(incident.occurred_at) : null,
  resolved_at_timestamp: incident.resolved_at ? Date.parse(incident.resolved_at) : 0,
  resolved_at_formatted: incident.resolved_at ? formatDateTime(incident.resolved_at) : null,
  days_listed: getDaysListed(incident.resolved_at, incident.occurred_at),
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

export const selectDetailsPageError = createSelector(
  [
    getIncidentError,
    getIncidentsForResourceError,
    getIncidentsForBlacklistError,
    getHistoricalIncidentsError,
  ],
  (incidentError, resourceError, blacklistError, historicalError) => {
    // Return the first error object we find
    switch (true) {
      case incidentError !== false:
        return incidentError;
      case resourceError !== false:
        return resourceError;
      case blacklistError !== false:
        return blacklistError;
      case historicalError !== false:
        return historicalError;
      default:
        return false;
    }
  },
);

export const selectBlacklistedCount = createSelector([getMonitors], monitors =>
  monitors.reduce(
    (totalBlacklistCount, monitor) => totalBlacklistCount + monitor.active_listing_count,
    0,
  ),
);
