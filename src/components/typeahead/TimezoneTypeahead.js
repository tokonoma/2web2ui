import React from 'react';
import { Typeahead } from './Typeahead';
import moment from 'moment-timezone';
import { TIMEZONES, TIMEZONE_LABEL_MAP } from 'src/constants/timezones';
import styles from './Typeahead.module.scss';

const Item = ({ label }) => (
  <div className={styles.Item}>
    <span className={styles.Value}>{label}</span>
  </div>
);

const options = moment.tz
  .names()
  .filter(tz => {
    return TIMEZONES.includes(tz);
  })
  .reduce((memo, tz) => {
    memo.push({
      name: tz,
      offset: moment.tz(tz).utcOffset(),
    });

    return memo;
  }, [])
  .sort((a, b) => {
    return a.offset - b.offset;
  })
  .reduce((memo, tz) => {
    const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';

    memo.push({
      value: tz.name,
      label: `(GMT${timezone}) ${TIMEZONE_LABEL_MAP[tz.name] || tz.name}`,
    });
    return memo;
  }, []);

export const TimezoneTypeahead = props => {
  return (
    <Typeahead
      renderItem={item => <Item label={item.label} />}
      itemToString={item => (item ? item.label : '')}
      placeholder="Select a Timezone"
      errorInLabel={false}
      disabled={false}
      error={false}
      name="timezone-typeahead"
      results={options}
      selectedItem={options.find(option => option.value === props.timezone)}
      {...props}
    />
  );
};
