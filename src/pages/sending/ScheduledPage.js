/* eslint-disable */
import React from 'react';
import { Page, Panel, Table, Button } from '@sparkpost/matchbox';
import { TableCollection, Empty } from 'src/components';
import { formatDateTime } from 'src/helpers/date';
import { connect } from 'react-redux';

const ScheduledPage = props => {
  const columns = [
    {
      label: 'Campaign Id',
      sortKey: 'campaignId',
    },
    {
      label: 'Template',
    },
    {
      label: 'Description',
    },
    {
      label: 'Status',
      sortKey: 'state',
    },
  ];

  return (
    <Page title="Scheduled Transmissions">
      <Panel></Panel>
    </Page>
  );
};

export default ScheduledPage;
