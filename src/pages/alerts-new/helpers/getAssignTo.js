import _ from 'lodash';

export default function (alert_subaccount) {
  switch (alert_subaccount) {
    case 0:
      return 'master';
    case -1:
      return 'all';
    case _.isNumber(alert_subaccount):
      return 'subaccount';
    default:
      return 'all';
  }
}
