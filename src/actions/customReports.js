import { updateUserUIOptions } from 'src/actions/currentUser';
import _ from 'lodash';

export function saveReport(report) {
  return (dispatch, getState) => {

    // A value of `false` represents an empty array
    // The API does not correctly update with an empty array
    const reports = _.get(getState(), 'currentUser.options.ui.customReports') || [];

    // Using name as a unique identifier
    const deduped = reports.filter((r) => r.name !== report.name);
    deduped.push(report);

    dispatch(updateUserUIOptions({
      customReports: deduped
    }));
  };
}

export function deleteReport(name) {
  return (dispatch, getState) => {
    const reports = _.get(getState(), 'currentUser.options.ui.customReports') || [];
    const filtered = reports.filter((r) => r.name !== name);

    // Updating with `false` here because the API does not correctly update with an empty array
    const toSave = filtered.length ? filtered : false;

    dispatch(updateUserUIOptions({
      customReports: toSave
    }));
  };
}
