import _ from 'lodash';
import { createSelector } from 'reselect';
import { formatDateTime } from '../helpers/date';

const getAlertsList = (state) => state.alertsV1.list;

const appendFormattedDate = (alert) => ({
  ...alert,
  sortKey: (alert.last_triggered) ? alert.last_triggered : '0',
  formattedDate: (alert.last_triggered) ? formatDateTime(alert.last_triggered) : 'Never Triggered'
});

export const selectAlertsList = createSelector(
  [ getAlertsList ],
  (alerts) => _.map(alerts, appendFormattedDate)
);

