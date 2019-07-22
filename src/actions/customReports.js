import { updateUserUIOptions } from 'src/actions/currentUser';
import _ from 'lodash';

export function saveReport(report) {
  return (dispatch, getState) => {
    const reports = _.get(getState(), 'currentUser.options.ui.customReports', []);
    const deduped = reports.filter((r) => r.name !== report.name);
    deduped.push(report);

    dispatch(updateUserUIOptions({
      customReports: deduped
    }));
  };
}

export function deleteReport(name) {
  return (dispatch, getState) => {
    const reports = _.get(getState(), 'currentUser.options.ui.customReports', []);

    dispatch(updateUserUIOptions({
      customReports: reports.filter((r) => r.name !== name)
    }));
  };
}
