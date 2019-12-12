import React, { useState } from 'react';
import { Page, Panel, Table, Button } from '@sparkpost/matchbox';
import { TableCollection, Empty } from 'src/components';
import { Link } from 'react-router-dom';

const OutboxPage = ({}) => {
  const [outbox] = useState(
    localStorage.getItem('outbox') ? JSON.parse(localStorage.getItem('outbox')) : [],
  );
  console.log(outbox);

  const TableWrapper = props => <Table>{props.children}</Table>;

  const columns = [
    { label: 'Campaign ID' },
    { label: 'Recipients' },
    { label: 'Template' },
    { label: 'Send Date' },
    null,
  ];
  const getRowData = ({ campaign_id, recipientList, sendTime, template }) => {
    return [
      <div>{campaign_id}</div>, //TODO: Add campaign ID
      <div>{recipientList.name}</div>,
      <div>{template.name}</div>,
      <div>{sendTime}</div>, //TODO: Fix date
      //Add IP Pool column
      //TODO: Add link
      <Button component={Link} to="/reports/message-events">
        View Details
      </Button>,
    ];
  };
  return (
    <Page title="Outbox">
      <Panel>
        {outbox.length <= 0 ? (
          <Empty message="No messages" />
        ) : (
          <TableCollection
            wrapperComponent={TableWrapper}
            rows={outbox}
            columns={columns}
            getRowData={getRowData}
            pagination
            defaultSortColumn="first_fired"
            defaultSortDirection="desc"
          />
        )}
      </Panel>
    </Page>
  );
};

export default OutboxPage;
