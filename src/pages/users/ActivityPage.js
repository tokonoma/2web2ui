import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Page, Panel } from 'src/components/matchbox';
import { PageDescription } from 'src/components/text';
import { Empty } from 'src/components';
import { PanelSectionLoading } from 'src/components/loading';
import ActivityList from './components/ActivityList';

export default function ActivityPage() {
  const { status, data = [] } = useQuery('activities', getActivities);

  return (
    <Page title="User Activity">
      <PageDescription>Activity from all users associated with this account.</PageDescription>

      <Panel>
        <Panel.Section>
          {status === 'loading' && <PanelSectionLoading />}

          {status === 'success' && data.length === 0 && (
            <Empty hasPanel={false} message="No activity found." />
          )}

          {status === 'success' && <ActivityList activities={data} />}
        </Panel.Section>
      </Panel>
    </Page>
  );
}

function getActivities({
  from = '2020-06-10T09:00',
  to = '2020-06-10T12:00',
  limit = '100',
  tenant_id = 'spc',
  customer_id = 107,
}) {
  return axios
    .get('https://drbgqnye23.execute-api.us-east-1.amazonaws.com/tst/activity', {
      params: {
        from,
        to,
        limit,
        tenant_id,
        customer_id,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
}
