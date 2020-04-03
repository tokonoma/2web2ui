import React, { useState, useEffect, useCallback } from 'react';
import { isForcedUTCRollupPrecision } from 'src/helpers/metrics';
import { Typeahead } from './Typeahead';
import moment from 'moment-timezone';
import styles from './Typeahead.module.scss';

const Item = ({ label }) => (
  <div className={styles.Item}>
    <span className={styles.Value}>{label}</span>
  </div>
);

const options = moment.tz
  .names()
  // Filter out non-standard timezones
  .filter(tz => tz.indexOf('/') >= 0)
  // Filter out inverse timezones (ETC/UTC-7 is equivalent to UTC+7)
  .filter(tz => tz.indexOf('Etc/') === -1)
  .reduce((memo, tz) => {
    const offset = moment.tz(tz).utcOffset();
    if (offset !== 0) {
      memo.push({
        name: tz,
        offset: offset,
      });
    }
    return memo;
  }, [])
  .sort((a, b) => a.offset - b.offset)
  .reduce((memo, tz) => {
    const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';
    memo.push({
      value: tz.name,
      label: `(UTC${timezone}) ${tz.name.replace(/_/g, ' ')}`,
    });
    return memo;
  }, []);

options.unshift({
  value: 'UTC',
  label: 'UTC',
});

export const TimezoneTypeahead = props => {
  const { initialValue, onChange: parentOnChange, precision, ...rest } = props;
  const [selected, setSelected] = useState(options[0]);

  const findOptionInList = useCallback(value => options.find(option => option.value === value), []);

  // initialValue may change if it's coming from redux on parent
  useEffect(() => {
    if (initialValue) {
      setSelected(findOptionInList(initialValue));
    }
  }, [initialValue, findOptionInList]);

  useEffect(() => {
    if (precision && isForcedUTCRollupPrecision(precision)) {
      setSelected(findOptionInList('UTC'));
      parentOnChange({ timezone: 'UTC' });
    }
  }, [precision, parentOnChange, findOptionInList]);

  const onChange = item => {
    setSelected(item);
    if (item) {
      parentOnChange(item);
    }
  };

  return (
    <Typeahead
      renderItem={item => <Item label={item.label} />}
      itemToString={item => (item ? item.label : '')}
      placeholder="Select a Timezone"
      label="Time Zone"
      errorInLabel={false}
      error={false}
      name="timezone-typeahead"
      results={options}
      selectedItem={selected}
      onChange={onChange}
      maxNumberOfResults={options.length}
      {...rest}
    />
  );
};
