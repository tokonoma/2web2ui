/* eslint-disable */
import React, { useEffect } from 'react';
import { Page, Panel, Table, Button } from '@sparkpost/matchbox';
import { TableCollection, Empty } from 'src/components';
import { formatDateTime } from 'src/helpers/date';
import { connect } from 'react-redux';
import { listScheduled } from 'src/actions/transmissions';

const ScheduledPage = props => {
  const { scheduled, loading, error, listScheduled } = props;
  const TableWrapper = props => <Table>{props.children}</Table>;

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

  useEffect(() => {
    console.log('boo');
    listScheduled();
  }, [listScheduled]);

  const getRowData = ({ content, id, campaignId: campaignId, description, state }) => {
    return [
      <div>{campaignId}</div>,
      <div>{content.id}</div>,
      <div>{description}</div>,
      <div>{state}</div>,
    ];
  };

  return (
    <Page title="Scheduled Transmissions">
      {scheduled.length <= 0 ? (
        <Empty message="No scheduled transmissions" />
      ) : (
        <TableCollection
          wrapperComponent={TableWrapper}
          rows={scheduled}
          columns={columns}
          getRowData={getRowData}
          pagination
          defaultSortColumn="campaignId"
          defaultSortDirection="desc"
        />
      )}
      <Panel></Panel>
    </Page>
  );
};

const MSTP = state => {
  console.log('state.transmissions', state.transmissions);
  return {
    loading: state.transmissions.scheduledListLoading,
    error: state.transmissions.scheduledListError,
    scheduled: state.transmissions.scheduledList,
  };
};

const MDTP = {
  listScheduled,
};

export default connect(MSTP, MDTP)(ScheduledPage);
