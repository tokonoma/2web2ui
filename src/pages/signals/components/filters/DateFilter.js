import React, { useEffect } from 'react';
import { FORMATS } from 'src/constants';
import { getRelativeDates } from 'src/helpers/date';
import DatePicker from 'src/components/datePicker/DatePicker';
import withSignalOptions from '../../containers/withSignalOptions';
import { minDays } from 'src/helpers/validation';
import moment from 'moment';

const OPTIONS = [
  '7days',
  '14days',
  '30days',
  '90days',
  'custom'
];

const DEFAULT_RANGE = '90days';

export function DateFilter({ signalOptions, changeSignalOptions, left, now = new Date() }) {

  // Constructs dates from relative range or custom dates
  // Handling this here removes this logic elsewhere in the app
  function handleChange(updates) {
    let options = updates;

    if (updates.relativeRange !== 'custom') {
      options = {
        ...getRelativeDates(updates.relativeRange, { now: moment(now).subtract(1, 'day') }),
        relativeRange: updates.relativeRange
      };
    }

    changeSignalOptions(options);
  }

  // On mount, sets dates from a 90 day default
  useEffect(() => {
    handleChange({ relativeRange: DEFAULT_RANGE });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DatePicker
      now={moment(now).subtract(1, 'day').toDate()}
      from={signalOptions.from}
      to={signalOptions.to}
      relativeDateOptions={OPTIONS}
      relativeRange={signalOptions.relativeRange}
      onChange={handleChange}
      dateFieldFormat={FORMATS.DATE}
      datePickerProps={{
        disabledDays: {
          after: moment(now).subtract(1, 'day').toDate(),
          before: moment(now).subtract(91, 'day').toDate()
        },
        fromMonth: moment(now).subtract(91, 'day').toDate()
      }}
      roundToPrecision={false}
      hideManualEntry
      left={left}
      validate={minDays(7)}
    />
  );
}

export default withSignalOptions(DateFilter);
