import React from 'react';
import { Panel } from 'src/components/matchbox';

export default function NewCollectionBody({heading, filterBox, collection, pagination }){
  return(
    <>
      <Panel>
        <Panel.Section>
          {heading}
        </Panel.Section>
        {filterBox}
        {collection}
      </Panel>
      {pagination}
    </>
  )
}
