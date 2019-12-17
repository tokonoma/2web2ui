import React, { useCallback, useEffect, useMemo } from 'react';
import moment from 'moment';
import { Grid, Tag } from '@sparkpost/matchbox';
import InboxPlacementTypeahead from 'src/components/typeahead/InboxPlacementTypeahead';
import DatePicker from 'src/components/datePicker/DatePicker';
import { getRelativeDates, formatApiTimestamp } from 'src/helpers/date';

import styles from './TrendsFilters.module.scss';
import {
  RELATIVE_DATE_OPTIONS,
  RELATIVE_DATE_RANGE_OPTIONS_MAP,
  TAG_LABELS,
} from '../constants/filters';

const TrendsFilters = ({ filters = {}, updateFilters, validateDate }) => {
  const { dateRange: { from, to } = {}, range, tags } = filters;

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

  const filterTags = useMemo(
    () =>
      Object.keys(tags).reduce((acc, curr) => {
        const vals = tags[curr].split(',');

        acc = acc.concat(
          vals.map(filter => ({
            type: curr,
            value: filter,
          })),
        );
        return acc;
      }, []),
    [tags],
  );

  const handleFilterRemove = useCallback(
    ({ type, value }) => {
      updateFilters({
        tags: {
          ...tags,
          [type]: tags[type]
            .split(',')
            .filter(val => val !== value)
            .join(','),
        },
      });
    },
    [tags, updateFilters],
  );

  const handleFilterAdd = (item, downshift) => {
    if (item) {
      const currentFilter = tags[item.type];
      downshift.clearSelection();
      updateFilters({
        tags: {
          ...tags,
          [item.type]: currentFilter ? [tags[item.type], item.value].join(',') : item.value,
        },
      });
    }
  };

  return (
    <Grid>
      <Grid.Column xs={12} lg={6}>
        <div className={styles.DatePicker}>
          <DatePicker
            relativeDateOptions={RELATIVE_DATE_OPTIONS}
            relativeRange={range}
            from={new Date(from)}
            to={new Date(to)}
            disabled={false}
            validate={validateDate}
            onChange={({ from, to, relativeRange }) => {
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
      <Grid.Column xs={12} lg={6}>
        <div className={styles.SearchFilter}>
          <InboxPlacementTypeahead filters={filters} onChange={handleFilterAdd} />
        </div>
      </Grid.Column>
      {filterTags.length ? (
        <Grid.Column xs={12} xl={12}>
          <div className={styles.TagContainer}>
            <strong>Filters:</strong>
            {filterTags.map(({ type, value }, index) => (
              <Tag
                key={`${type}_${value}_${index}`}
                onRemove={() => handleFilterRemove({ type, value })}
                className={styles.TagWrapper}
              >
                {TAG_LABELS[type]}: {value}
              </Tag>
            ))}
          </div>
        </Grid.Column>
      ) : null}
    </Grid>
  );
};

export default TrendsFilters;
