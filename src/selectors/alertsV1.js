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

