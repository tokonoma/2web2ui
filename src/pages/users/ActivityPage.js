import React from 'react';
import { Page, Panel } from 'src/components/matchbox';
import { PageDescription } from 'src/components/text';
import ActivityList from './components/ActivityList';

export default function ActivityPage() {
  return (
    <Page title="User Activity">
      <PageDescription>A log of activity for users managed within your account.</PageDescription>

      <Panel>
        <Panel.Section>
          <ActivityList />
        </Panel.Section>
      </Panel>
    </Page>
  );
}
