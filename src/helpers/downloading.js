import _ from 'lodash';
import Papa from 'papaparse';

export function formatToCsv({ data: rows, returnBlob }) {
  // we are doing this because certain keys are objects/array which papa parse doesn't stringify
  const mappedRows = _.map(rows, (row) => _.mapValues(row, (value) => _.isObject(value) || _.isArray(value) ? JSON.stringify(value) : value));
  const csvData = Papa.unparse(mappedRows);
  return (returnBlob)
    ? new Blob([csvData], { type: 'text/csv' })
    : `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
}

export function download({ name, url }) {

  const objectURL = URL.createObjectURL(url);
  const link = document.createElement('a');
  link.href = objectURL;
  link.setAttribute('download', name);

  // Firefox requires the link be added to the DOM before it can be .click()'d
  document.body.appendChild(link);
  link.click();
  // Need to make sure we wait for the next event loop to be sure the link click finishes
  // before we remove the link from the DOM and revoke the object URL
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(objectURL);
  }, 0);
}
