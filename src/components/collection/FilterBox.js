import React from 'react';
import { TextField, Panel } from '@sparkpost/matchbox';
import { Search } from '@sparkpost/matchbox-icons';
import { getRandomExampleSearch } from './helpers/exampleSearch';
import styles from './FilterBox.module.scss';

export default function CollectionFilterBox(props) {
  const { isV2Table, placeholder } = props;
  const placeholderText = placeholder || `Filter results e.g. ${getRandomExampleSearch(props)}`;
  const text = (<TextField
    name="collection-filter-box"
    suffix={<Search />}
    placeholder={placeholderText}
    onChange={(e) => props.onChange(e.target.value)}
  />);

  return (
    (isV2Table)
      ? (
        <div className = {styles.Box}>
          {text}
        </div>)
      : (
        <Panel sectioned>
          {text}
        </Panel>
      )
  );
}
