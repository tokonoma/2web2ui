import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { useQuery } from 'react-query';
import { Button, Page, Panel } from 'src/components/matchbox';
import { PageDescription } from 'src/components/text';
import { Empty } from 'src/components';
import DatePicker from 'src/components/datePicker/DatePicker';
import { PanelSectionLoading } from 'src/components/loading';
import ActivityList from './components/ActivityList';

export default function ActivityPage() {
  const now = new Date();
  const [limit, setLimit] = useState(50);
  const [datePicker, setDatePicker] = useState({
    relativeRange: 'custom',
    from: moment(now - 7 * 24 * 3600 * 1000),
    to: now,
    precision: 'hour',
  });
  const { status, data, refetch } = useQuery(
    ['activities', { ...datePicker, limit }],
    getActivities,
  );

  const handleChange = e => {
    setDatePicker({
      ...datePicker,
      ...e,
    });
  };

  const handleLoadMore = () => {
    setLimit(limit + 50);
    refetch();
  };

  return (
    <Page title="User Activity">
      <PageDescription>Activity from all users associated with this account.</PageDescription>

      <Panel>
        <Panel.Section>
          <DatePicker
            relativeDateOptions={['custom']}
            from={datePicker.from}
            to={datePicker.to}
            onChange={e => handleChange(e)}
            precision={datePicker.precision}
            roundToPrecision={true}
            disabled={status === 'loading'}
          />
        </Panel.Section>

        <Panel.Section>
          {status === 'loading' && <PanelSectionLoading />}

          {status === 'success' && data.length === 0 && (
            <Empty hasPanel={false} message="No activity found." />
          )}

          {status === 'success' && data.length > 0 && <ActivityList activities={data} />}

          <Button variant="secondary" onClick={handleLoadMore} disabled={status === 'loading'}>
            Load More
          </Button>
        </Panel.Section>
      </Panel>
    </Page>
  );
}

async function getActivities(key, { from, to, limit, tenant_id = 'spc', customer_id = 107 }) {
  const { data } = await axios.get(
    'https://drbgqnye23.execute-api.us-east-1.amazonaws.com/tst/activity',
    {
      params: {
        from: moment(from)
          .toISOString()
          .split('.')[0],
        to: moment(to)
          .toISOString()
          .split('.')[0],
        limit,
        tenant_id,
        customer_id,
      },
    },
  );

  return data;
}
