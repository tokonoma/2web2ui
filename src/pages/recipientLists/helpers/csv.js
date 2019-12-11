import Papa from 'papaparse';
import _ from 'lodash';

// Adapted minimally from parseRecipientList() in webui/src/app/recipients/recipients-controller.js

const renameJsonKeys = field => {
  Object.entries(field).forEach(([key, value]) => {
    delete field[key];
    field[key.split(':').pop()] = value;
  });
  return field;
};

const buildJsonKeys = row => {
  const newFields = {};
  newFields.substitution_data = renameJsonKeys(
    _.pickBy(row, (val, key) => _.startsWith(key, 'substitution_data:')),
  );
  newFields.metadata = renameJsonKeys(_.pickBy(row, (val, key) => _.startsWith(key, 'metadata:')));
  newFields.tags = _.compact(_.values(_.pickBy(row, (val, key) => _.startsWith(key, 'tags:'))));

  return newFields;
};

const parseRawRecords = (results, resolve, reject) => {
  const mapped = [];
  const errors = [];

  const parseJSONField = ({ field, datum, out, line, errors }) => {
    if (datum[field]) {
      try {
        out[field] = JSON.parse(datum[field]);
      } catch (e) {
        // e is a SyntaxError
        errors.push(`Error parsing ${field} on line #'${line}: invalid JSON: ${e.message}`);
      }
    }
  };

  // map each field
  results.data.forEach((datum, index) => {
    const line = index + 2;
    const out = {};
    const preErrorCount = errors.length;

    // email is required
    if (datum.email) {
      out.address = { email: datum.email };
    } else {
      errors.push(`Error parsing line #${line}: email field is missing`);
    }

    // these fields are optional, but should display errors if invalid parsing
    parseJSONField({ field: 'metadata', datum, out, line, errors });
    parseJSONField({ field: 'substitution_data', datum, out, line, errors });
    parseJSONField({ field: 'tags', datum, out, line, errors });

    // NOTE: the old UI stopped parsing after a single error here.
    // We continue to collect errors

    if (datum.return_path) {
      out.return_path = datum.return_path;
    }

    if (datum.name && out.address) {
      out.address.name = datum.name;
    }

    const generatedData = buildJsonKeys(datum);

    if (!datum.substitution_data && generatedData.substitution_data) {
      out.substitution_data = generatedData.substitution_data;
    }

    if (!datum.metadata && generatedData.metadata) {
      out.metadata = generatedData.metadata;
    }

    if (!datum.tags && generatedData.substitution_data) {
      out.tags = generatedData.tags;
    }

    if (preErrorCount === errors.length) {
      mapped.push(out);
    }
  });

  if (errors.length === 0) {
    return resolve(mapped);
  }

  return reject(errors);
};

const parseRecipientListCsv = file =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: result => parseRawRecords(result, resolve, reject),
      error: () => reject(['Unable to read your file']),
    });
  });

export default parseRecipientListCsv;
