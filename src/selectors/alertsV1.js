import { createSelector } from 'reselect';
import { formatDateTime } from '../helpers/date';

const getAlertsList = (state) => state.alertsV1.list;

export const selectAlertsList = createSelector(
  [ getAlertsList ],
  (alerts) => alerts.map((alert) =>
    ({
      ...alert,
      last_triggered_timestamp: (alert.last_triggered) ? Date.parse(alert.last_triggered) : 0,
      last_triggered_formatted: (alert.last_triggered) ? formatDateTime(alert.last_triggered) : null
    })
  )
);

export const selectRecentlyTriggeredAlerts = createSelector(
  [ selectAlertsList ],
  (alerts) => alerts
    .filter((alert) => alert.last_triggered !== null) //Remove any alert that has never triggered
    .sort((a, b) => (b.last_triggered_timestamp - a.last_triggered_timestamp)) //Sorts by last triggered date, descending
    .slice(0,4)
);


