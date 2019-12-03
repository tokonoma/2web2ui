import { createSelector } from 'reselect';
import { formatDateTimeWithAt } from '../helpers/date';

const getIncidents = state => state.blacklist.incidents;

export const selectIncidentsList = createSelector([getIncidents], incidents =>
  incidents.map(incident => ({
    ...incident,
    occurred_at_timestamp: incident.occurred_at ? Date.parse(incident.occurred_at) : 0,
    occurred_at_formatted: incident.occurred_at ? formatDateTimeWithAt(incident.occurred_at) : null,
  })),
);
