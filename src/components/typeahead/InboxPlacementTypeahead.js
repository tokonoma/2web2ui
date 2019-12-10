import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { formatApiDate } from 'src/helpers/date';
import { Typeahead } from './Typeahead';
import { getInboxPlacementTrendsFilterValues } from 'src/actions/inboxPlacement';

import styles from './Typeahead.module.scss';

const TAG_LABELS = {
  from_domains: 'Domain',
  mailbox_providers: 'Mailbox Provider',
  regions: 'Region',
  sending_ips: 'IP',
};

const Item = ({ value, type }) => (
  <div className={styles.Item}>
    <span className={styles.Value}>{value}</span>
    <span className={styles.id}>{TAG_LABELS[type]}</span>
  </div>
);

const InboxPlacementTypeahead = ({
  filters,
  trendsFilterValues,
  trendsFilterValuesloading,
  trendsFilterValuesError,
  getInboxPlacementTrendsFilterValues,
  ...rest
}) => {
  const {
    dateRange: { from, to },
    tags,
  } = filters;

  useEffect(() => {
    getInboxPlacementTrendsFilterValues({
      from: formatApiDate(from),
      to: formatApiDate(to),
      ...tags,
    });
  }, [from, to, tags, getInboxPlacementTrendsFilterValues]);

  const results = useMemo(
    () =>
      Object.keys(trendsFilterValues).reduce((acc, type) => {
        if (trendsFilterValues[type].length) {
          acc = acc.concat(
            trendsFilterValues[type]
              .filter(
                value => !tags[type] || (tags[type] && !tags[type].split(',').includes(value)),
              )
              .map(value => ({
                type,
                value,
              })),
          );
        }
        return acc;
      }, []),
    [trendsFilterValues, tags],
  );

  return (
    <Typeahead
      renderItem={item => <Item value={item.value} type={item.type} />}
      itemToString={item => (item ? item.value : '')}
      placeholder="Filter by Domain, IP, Mailbox Provider and Region"
      errorInLabel={false}
      disabled={trendsFilterValuesloading || trendsFilterValuesError}
      error={trendsFilterValuesError}
      name="inbox-placement-typeahead"
      results={results}
      selectedItem={''}
      {...rest}
    />
  );
};

const mapStateToProps = state => ({
  trendsFilterValuesError: state.inboxPlacement.getTrendsFilterValuesError,
  trendsFilterValuesloading: state.inboxPlacement.getTrendsFilterValuesPending,
  trendsFilterValues: state.inboxPlacement.trendsFilterValues || [],
});

export default connect(mapStateToProps, { getInboxPlacementTrendsFilterValues })(
  InboxPlacementTypeahead,
);
