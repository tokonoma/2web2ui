import React from 'react';
import { Panel } from '@sparkpost/matchbox';
import GuideBreadCrumbs from './GuideBreadCrumbs';
import { SHOW_ME_SPARKPOST_LIST } from '../constants';
import CheckListItem from './CheckListItem';

export default function ShowMeSparkpostStep() {
  return (
    <>
      <Panel.Section>
        <GuideBreadCrumbs />
        <CheckListItem {...SHOW_ME_SPARKPOST_LIST['Send Test Email']} />
      </Panel.Section>
      <Panel.Section>
        <CheckListItem {...SHOW_ME_SPARKPOST_LIST['Explore Analytics']} />
      </Panel.Section>
      <Panel.Section>
        <CheckListItem {...SHOW_ME_SPARKPOST_LIST['Invite a Collaborator']} />
      </Panel.Section>
    </>
  );
}
