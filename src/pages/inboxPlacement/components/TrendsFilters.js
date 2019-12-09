import React, { useEffect } from 'react';
import { Grid } from '@sparkpost/matchbox';
import DatePicker from 'src/components/datePicker/DatePicker';
import { getRelativeDates, formatApiTimestamp } from 'src/helpers/date';
import styles from './TrendsFilters.module.scss';
import { RELATIVE_DATE_OPTIONS, RELATIVE_DATE_RANGE_OPTIONS_MAP } from '../constants/filters';
import moment from 'moment';

const TrendsFilters = ({ filters = {}, updateFilters }) => {
  const { dateRange: { from, to } = {}, range } = filters;

  // If the "to" is the current time, use the correct relative range option
  // Otherwise, we're using a custom range
  useEffect(() => {
    if (moment.utc().diff(moment.utc(to), 'minute') > 0) {
      updateFilters({
        range: 'custom',
      });
    } else {
      updateFilters({
        range: RELATIVE_DATE_RANGE_OPTIONS_MAP[moment.utc(to).diff(moment.utc(from), 'days')],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid>
      <Grid.Column xs={12} md={6}>
        <div className={styles.FieldWrapper}>
          <DatePicker
            relativeDateOptions={RELATIVE_DATE_OPTIONS}
            relativeRange={range}
            from={new Date(from)}
            to={new Date(to)}
            disabled={false}
            onChange={({ from, to, relativeRange }) => {
              console.warn(from, to, relativeRange);
              if (from === undefined && to === undefined) {
                const relativeDates = getRelativeDates(relativeRange);

                updateFilters({
                  dateRange: {
                    from: formatApiTimestamp(relativeDates.from),
                    to: formatApiTimestamp(relativeDates.to),
                  },
                  range: relativeRange,
                });
              } else {
                updateFilters({
                  dateRange: {
                    from: formatApiTimestamp(from),
                    to: formatApiTimestamp(to),
                  },
                  range: 'custom',
                });
              }
            }}
            roundToPrecision={true}
          />
        </div>
      </Grid.Column>
      <Grid.Column xs={8} md={4} xl={5}>
        <div />
      </Grid.Column>
    </Grid>
  );
};

export default TrendsFilters;
