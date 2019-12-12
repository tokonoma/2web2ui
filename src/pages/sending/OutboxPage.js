import React, { useMemo } from 'react';
import { Page, Panel, Table, Button } from '@sparkpost/matchbox';
import { TableCollection, Empty } from 'src/components';
import { Link } from 'react-router-dom';
import { formatDateTime } from 'src/helpers/date';
import { connect } from 'react-redux';
import { getAccountUiOptionValue } from 'src/helpers/conditions/account';
import { fetch as fetchAccount } from 'src/actions/account';
import moment from 'moment';

const OutboxPage = ({ outbox: allOutbox }) => {
  const TableWrapper = props => <Table>{props.children}</Table>;

  const outbox = useMemo(() => {
    return allOutbox.filter(({ sendTime }) => {
      return moment(sendTime).isBefore(moment.now());
    });
  }, [allOutbox]);

  const columns = [
    { label: 'Campaign ID', sortKey: 'campaignId' },
    { label: 'Template' },
    { label: 'Description' },
    { label: 'Recipients' },
    { label: 'IP Pool' },
    { label: 'Send Date', sortKey: 'sendTime' },
    null,
  ];

  const filterBoxConfig = {
    show: true,
    exampleModifiers: ['campaignId', 'description'],
    itemToStringKeys: [
      'campaignId',
      'template',
      'description',
      'recipientList',
      'ipPool.name',
      'id',
    ],
    wrapper: props => <div>{props}</div>,
  };

  const getRowData = ({
    id,
    campaignId,
    recipientList,
    ipPool = {},
    sendTime,
    template,
    description,
  }) => {
    return [
      <div>{campaignId}</div>,
      <div>{template.name}</div>,
      <div>{description}</div>,
      <div>{recipientList.name}</div>,
      <div>{ipPool.name}</div>,
      <div>{formatDateTime(sendTime)}</div>,
      //Add IP Pool column
      //TODO: Add link
      <Button component={Link} to={`/reports/message-events?range=10days&transmissions=${id}`}>
        View Details
      </Button>,
    ];
  };
  return (
    <Page title="Outbox">
      {outbox.length <= 0 ? (
        <Empty message="No messages" />
      ) : (
        <TableCollection
          wrapperComponent={TableWrapper}
          rows={outbox}
          columns={columns}
          getRowData={getRowData}
          pagination
          filterBox={filterBoxConfig}
          defaultSortColumn="sendTime"
          defaultSortDirection="desc"
        >
          {({ filterBox, collection, pagination }) => (
            <>
              <Panel sectioned>{filterBox}</Panel>
              <Panel>{collection}</Panel>
              {pagination}
            </>
          )}
        </TableCollection>
      )}
    </Page>
  );
};

export default connect(
  state => ({
    outbox: getAccountUiOptionValue('hackathon_outbox')(state) || [],
  }),
  { fetchAccount },
)(OutboxPage);
