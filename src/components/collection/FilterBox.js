import React from 'react';
import { Search } from '@sparkpost/matchbox-icons';
import { tokens } from '@sparkpost/design-tokens-hibana';
import { Box, Label, Panel, TextField, ScreenReaderOnly } from 'src/components/matchbox';
import { getRandomExampleSearch } from './helpers/exampleSearch';
import styles from './FilterBox.module.scss';
import { useHibana } from 'src/context/HibanaContext';

function CollectionFilterBox(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  const {
    initialValue,
    placeholder,
    wrapper,
    maxWidth = tokens.sizing_1200,
    onChange,
    onBlur = () => {},
  } = props;
  const placeholderText = placeholder || `Filter results e.g. ${getRandomExampleSearch(props)}`;

  const text = (
    <>
      {!isHibanaEnabled && (
        <Label id="collection-filter-box" className={styles.FilterBoxLabel}>
          <ScreenReaderOnly>Filter By</ScreenReaderOnly>
        </Label>
      )}

      <Box maxWidth={maxWidth}>
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
      </Box>
    </>
  );

  return wrapper ? (
    wrapper(text)
  ) : (
    <Panel mb="0" className={styles.Panel} sectioned>
      {text}
    </Panel>
  );
}

export default CollectionFilterBox;
