import React from 'react';
import { Label, Panel, TextField, ScreenReaderOnly } from 'src/components/matchbox';
import { Search } from '@sparkpost/matchbox-icons';
import { getRandomExampleSearch } from './helpers/exampleSearch';
import styles from './FilterBox.module.scss';
import { useHibana } from 'src/context/HibanaContext';

function CollectionFilterBox(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  const { initialValue, placeholder, wrapper, onChange, onBlur = () => {} } = props;
  const placeholderText = placeholder || `Filter results e.g. ${getRandomExampleSearch(props)}`;

  const text = (
    <>
      {!isHibanaEnabled && (
        <Label id="collection-filter-box" className={styles.FilterBoxLabel}>
          <ScreenReaderOnly>Filter By</ScreenReaderOnly>
        </Label>
      )}

      <TextField
        labelHidden
        label={isHibanaEnabled ? 'Filter By' : undefined}
        id="collection-filter-box"
        name="collection-filter-box"
        suffix={<Search />}
        placeholder={placeholderText}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur(e.target.value)}
        defaultValue={initialValue}
      />
    </>
  );

  return wrapper ? wrapper(text) : <Panel sectioned>{text}</Panel>;
}

export default CollectionFilterBox;
