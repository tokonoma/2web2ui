import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { useQuery } from 'react-query';
import { Button, Grid, Page, Panel, Select, TextField } from 'src/components/matchbox';
import { PageDescription } from 'src/components/text';
import { Empty } from 'src/components';
import DatePicker from 'src/components/datePicker/DatePicker';
import { PanelSectionLoading } from 'src/components/loading';
import ActivityList from './components/ActivityList';

export default function ActivityPage() {
  const now = new Date();
  const [limit, setLimit] = useState(25);
  const [filters, setFilters] = useState({
    type: undefined,
    userId: undefined,
  });
  const [datePicker, setDatePicker] = useState({
    relativeRange: 'custom',
    from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    to: now,
    precision: 'hour',
  });
  const { status, data = [], refetch } = useQuery(
    ['activities', { ...datePicker, limit }],
    getActivities,
  );
  const [filteredData, setFilteredData] = useState(data);

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

  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter(activity => {
          // THIS IS HORRIBLE. Could very easily be cleaned up, but :shrug: - Hackathon, baby.
          if (!filters.type && !filters.userId) {
            return true;
          }

          if (filters.type && filters.userId) {
            return activity.type === filters.type && activity.uid === filters.userId;
          }

          if (filters.type) {
            return activity.type === filters.type;
          }

          if (filters.userId) {
            return activity.uid === filters.userId;
          }
        }),
      );
    }
  }, [filters, setFilteredData, data]);

  return (
    <Page title="User Activity">
      <PageDescription>Activity from all users associated with this account.</PageDescription>

      <Panel>
        <Panel.Section>
          <Grid>
            <Grid.Column xs={6}>
              <DatePicker
                relativeDateOptions={['custom']}
                from={datePicker.from}
                to={datePicker.to}
                onChange={e => handleChange(e)}
                precision={datePicker.precision}
                roundToPrecision={true}
                disabled={status === 'loading'}
              />
            </Grid.Column>

            <Grid.Column xs={3}>
              <TextField
                id="user-id-filter"
                name="userIdFilter"
                placeholder="Filter by user ID"
                onChange={e => setFilters({ ...filters, userId: e.target.value })}
              />
            </Grid.Column>

            <Grid.Column xs={3}>
              <Select
                id="type-filter"
                options={[
                  { label: 'Filter by activity type', value: 'default', disabled: true },
                  { label: 'Request', value: 'request' },
                  { label: 'Click', value: 'click' },
                  { label: 'Page View', value: 'pageview' },
                  { label: 'Change', value: 'change' },
                  { label: 'Login', value: 'login' },
                ]}
                defaultValue="default"
                onChange={e => setFilters({ ...filters, type: e.target.value })}
              />
            </Grid.Column>
          </Grid>
        </Panel.Section>

        <Panel.Section paddingBottom={filteredData.length > 0 ? '0' : undefined}>
          {status === 'loading' && <PanelSectionLoading />}

          {status === 'success' && filteredData.length === 0 && (
            <Empty hasPanel={false} message="No activity found." />
          )}

          {status === 'success' && filteredData.length > 0 && (
            <ActivityList activities={filteredData} />
          )}
        </Panel.Section>

        {status === 'success' && filteredData.length === limit && (
          <Panel.Section>
            <Button variant="secondary" onClick={handleLoadMore} disabled={status === 'loading'}>
              Load More Results
            </Button>
          </Panel.Section>
        )}
      </Panel>

      <Button style={{ float: 'right' }} variant="monochrome-secondary">
        Download as CSV
      </Button>
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
