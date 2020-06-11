import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { useQuery } from 'react-query';
import { Page, Panel } from 'src/components/matchbox';
import { PageDescription } from 'src/components/text';
import { Empty } from 'src/components';
import DatePicker from 'src/components/datePicker/DatePicker';
import { PanelSectionLoading } from 'src/components/loading';
import ActivityList from './components/ActivityList';

export default function ActivityPage() {
  const now = new Date();
  const [datePicker, setDatePicker] = useState({
    relativeRange: 'custom',
    from: moment(now - 7 * 24 * 3600 * 1000),
    to: now,
    precision: 'hour',
  });
  const { status, data } = useQuery(['activities', datePicker], getActivities);

  const handleChange = e => {
    setDatePicker({
      ...datePicker,
      ...e,
    });
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
        </Panel.Section>
      </Panel>
    </Page>
  );
}

async function getActivities(key, { from, to, limit = 500, tenant_id = 'spc', customer_id = 107 }) {
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
