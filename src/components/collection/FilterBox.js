import React, { useEffect } from 'react';
import { Label, ScreenReaderOnly, TextField, Panel } from '@sparkpost/matchbox';
import { Search } from '@sparkpost/matchbox-icons';
import { getRandomExampleSearch } from './helpers/exampleSearch';
import styles from './FilterBox.module.scss';

export default function CollectionFilterBox(props) {
  const { placeholder, wrapper, onChange, onBlur, defaultValue } = props;
  const placeholderText = placeholder || `Filter results e.g. ${getRandomExampleSearch(props)}`;

  // If there is a defaultValue for filter box, call onChange with defaultValue
  useEffect(() => {
    if (defaultValue && onChange) {
      onChange(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = (
    <>
      <Label id="collection-filter-box" className={styles.FilterBoxLabel}>
        <ScreenReaderOnly>Filter By</ScreenReaderOnly>
      </Label>

      <TextField
        id="collection-filter-box"
        name="collection-filter-box"
        suffix={<Search />}
        placeholder={placeholderText}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur && onBlur(e.target.value)}
        defaultValue={defaultValue}
      />
    </>
  );

  return wrapper ? wrapper(text) : <Panel sectioned>{text}</Panel>;
}
