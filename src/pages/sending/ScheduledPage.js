/* eslint-disable */
import React, { useEffect } from 'react';
import { Page, Panel, Table, Button } from '@sparkpost/matchbox';
import { TableCollection, Empty, Loading } from 'src/components';
import { formatDateTime } from 'src/helpers/date';
import { connect } from 'react-redux';
import { listScheduled, deleteScheduled } from 'src/actions/transmissions';
import { showAlert } from 'src/actions/globalAlert';

const ScheduledPage = props => {
  const { scheduled, loading, listScheduled, showAlert, deleteScheduled } = props;
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
    {
      label: 'Scheduled Time',
      sortKey: 'start_time',
    },
    null,
  ];

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filterBoxConfig = {
    show: true,
    exampleModifiers: ['campaign_id'],
    itemToStringKeys: ['campaign_id'],
    wrapper: props => <div>{props}</div>,
  };

  const handleCancelClick = id => {
    deleteScheduled(id).then(() => {
      showAlert({
        type: 'success',
        message: `Transmission ${id} canceled`,
      });
      listScheduled();
    });
  };

  useEffect(() => {
    listScheduled();
  }, [listScheduled]);

  const getRowData = ({ content, id, campaign_id, description, state, send_time }) => {
    return [
      <div>{campaign_id}</div>,
      <div>{content.template_id}</div>,
      <div>{description}</div>,
      <div>{capitalizeFirstLetter(state)}</div>,
      <div>{formatDateTime(send_time)}</div>,
      <>
        {state !== 'Canceled' && state !== 'Success' && (
          <Button destructive onClick={() => handleCancelClick(id)}>
            Cancel
          </Button>
        )}
      </>,
    ];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Page title="Scheduled Transmissions">
      {scheduled.length === 0 ? (
        <Empty message="No scheduled transmissions" />
      ) : (
        <TableCollection
          wrapperComponent={TableWrapper}
          rows={scheduled}
          columns={columns}
          getRowData={getRowData}
          pagination
          filterBox={filterBoxConfig}
          defaultSortColumn="start_time"
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
      <Panel></Panel>
    </Page>
  );
};

const MSTP = state => {
  return {
    loading: state.transmissions.scheduledLoading,
    error: state.transmissions.scheduledListError,
    scheduled: state.transmissions.scheduledList,
  };
};

const MDTP = {
  listScheduled,
  deleteScheduled,
  showAlert,
};

export default connect(MSTP, MDTP)(ScheduledPage);
