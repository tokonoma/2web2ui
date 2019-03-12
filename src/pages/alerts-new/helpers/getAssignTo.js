export default function (alert_subaccount) {
  const alert_subaccount_number = parseInt(alert_subaccount);
  switch (alert_subaccount_number) {
    case 0:
      return 'master';
    case -1:
      return 'all';
    default:
      return 'subaccount';
  }
}
