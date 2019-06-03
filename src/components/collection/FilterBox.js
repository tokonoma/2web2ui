import React from 'react';
import { TextField, Panel } from '@sparkpost/matchbox';
import { Search } from '@sparkpost/matchbox-icons';
import { getRandomExampleSearch } from './helpers/exampleSearch';

export default function CollectionFilterBox(props) {
  const { isV2Table } = props;
  const placeholder = `Filter results e.g. ${getRandomExampleSearch(props)}`;
  const text = (<TextField
    name="collection-filter-box"
    prefix={<Search />}
    placeholder={placeholder}
    onChange={(e) => props.onChange(e.target.value)}
  />);

  return (
    (isV2Table)
      ? (<>
     {text}
    </>)
      : (
        <Panel sectioned>
          {text}
        </Panel>
      )
  );
}
