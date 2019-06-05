import React from 'react';
import { TextField, Panel } from '@sparkpost/matchbox';
import { Search } from '@sparkpost/matchbox-icons';
import { getRandomExampleSearch } from './helpers/exampleSearch';

export default function CollectionFilterBox(props) {
  const { placeholder, wrapper } = props;
  const placeholderText = placeholder || `Filter results e.g. ${getRandomExampleSearch(props)}`;
  const text = (<TextField
    name="collection-filter-box"
    suffix={<Search />}
    placeholder={placeholderText}
    onChange={(e) => props.onChange(e.target.value)}
  />);

  return (
    (wrapper)
      ? wrapper(text)
      : (
        <Panel sectioned>
          {text}
        </Panel>
      )
  );
}
