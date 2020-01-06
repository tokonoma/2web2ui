import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import GuideBreadCrumbs from './GuideBreadCrumbs';
import CheckListItem from './CheckListItem';
import { LETS_CODE_LIST } from '../constants';

export default function LetsCodeStep() {
  return (
    <>
      <Panel.Section>
        <GuideBreadCrumbs />
        <CheckListItem {...LETS_CODE_LIST['Add Sending Domain']} />
      </Panel.Section>
      <Panel.Section>
        <CheckListItem {...LETS_CODE_LIST['Generate API Key']} />
      </Panel.Section>
      <Panel.Section>
        <CheckListItem
          {...LETS_CODE_LIST['View Developer Docs']}
          action={{
            to: 'https://developers.sparkpost.com/api',
            external: true,
          }}
        />
      </Panel.Section>
    </>
  );
}
