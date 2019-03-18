/* eslint-disable max-lines */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { snakeToFriendly } from 'src/helpers/string';
import { Button, Page, Tooltip } from '@sparkpost/matchbox';
import { Info } from '@sparkpost/matchbox-icons';
import { PanelLoading, TableCollection, ApiErrorBanner, Empty } from 'src/components';
import DisplayDate from './components/DisplayDate';
import MessageEventsSearch from './components/MessageEventsSearch';
import ViewDetailsButton from './components/ViewDetailsButton';
import { getMessageEvents, changePage, getMessageEventsCSV } from 'src/actions/messageEvents';
import { selectMessageEvents } from 'src/selectors/messageEvents';
import { formatToCsv, download } from 'src/helpers/downloading.js';
import { DEFAULT_PER_PAGE_BUTTONS } from 'src/constants';
import CursorPaging from './components/CursorPaging';
import _ from 'lodash';
import PerPageButtons from 'src/components/collection/PerPageButtons.js';
import styles from './MessageEventsPage.module.scss';

const errorMsg = 'Sorry, we seem to have had some trouble loading your message events.';
const emptyMessage = 'There are no message events for your current query';
const csvTooltip = 'Save the first 1000 events as csv file';

const columns = [
  { label: 'Time' },
  { label: 'Event' },
  { label: 'Recipient' },
  { label: 'From Address' },
  null
];

export class MessageEventsPage extends Component {

  state = {
    currentPage: 1,
    perPage: 25
  }

  componentDidUpdate(prevProps) {
    const { search, getMessageEvents, eventsCSV } = this.props;
    const { perPage } = this.state;
    //Refresh the page & load new data if the search filters have changed
    if (!_.isEqual(prevProps.search, search)) {
      this.setState({ currentPage: 1 });
      getMessageEvents({ perPage, ...search });
    }
    if (!prevProps.eventsCSV.length && eventsCSV.length) {
      this.downloadCSV();
    }
  }

  downloadCSV = () => {
    const { eventsCSV } = this.props;
    const url = formatToCsv({ data: eventsCSV, returnBlob: true });
    const now = Math.floor(Date.now() / 1000);
    download({ name: `sparkpost-csv-${now}.csv`, url });
  };


  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
    const { changePage } = this.props;
    return changePage(currentPage);
  }

  handlePerPageChange = (perPage) => {
    const { search, getMessageEvents } = this.props;
    this.setState({ perPage, currentPage: 1 });
    getMessageEvents({ perPage, ...search });
  }

  //Reload the first page w/ api call, NOT from cache
  handleFirstPage = () => {
    const { search, getMessageEvents } = this.props;
    const { perPage } = this.state;
    this.setState({ currentPage: 1 });
    getMessageEvents({ perPage, ...search });
  }

  isPreviousDisabled = () => {
    const { currentPage } = this.state;
    return currentPage <= 1;
  }

  isNextDisabled = () => {
    const { hasMorePagesAvailable } = this.props;
    return !hasMorePagesAvailable;
  }

  getCSV = () => {
    const { search, getMessageEventsCSV } = this.props;
    getMessageEventsCSV(search);
  }

  getRowData = (rowData) => {
    const { timestamp, formattedDate, type, friendly_from, rcpt_to } = rowData;
    return [
      <DisplayDate timestamp={timestamp} formattedDate={formattedDate} />,
      snakeToFriendly(type),
      rcpt_to,
      friendly_from,
      <ViewDetailsButton {...rowData} />
    ];
  }

  renderError() {
    const { error, getMessageEvents, search } = this.props;
    return (
      <ApiErrorBanner
        message={errorMsg}
        errorDetails={error.message}
        reload={() => getMessageEvents(search)}
      />
    );
  }

  renderCollection() {
    const { events, empty, loading, totalCount, eventsCSVLoading } = this.props;
    const { currentPage, perPage } = this.state;

    if (loading) {
      return <PanelLoading />;
    }

    const content = empty
      ? <Empty message={emptyMessage} />
      : (
        <div>
          <TableCollection
            columns={columns}
            rows={events}
            getRowData={this.getRowData}
            defaultSortColumn='timestamp'
            defaultSortDirection='desc'
          />
          <CursorPaging
            currentPage={currentPage}
            handlePageChange = {this.handlePageChange}
            previousDisabled={this.isPreviousDisabled()}
            nextDisabled={this.isNextDisabled()}
            handleFirstPage={this.handleFirstPage}
            perPage={perPage}
            totalCount={totalCount}
          />
          <div className={styles.PerPageButtons}>
            <PerPageButtons
              totalCount={totalCount}
              data={events}
              onPerPageChange={this.handlePerPageChange}
              perPageButtons={DEFAULT_PER_PAGE_BUTTONS}
              perPage={perPage}
              saveCsv={true}
            />
            <Button onClick={this.getCSV} disabled = {eventsCSVLoading}>
              {(eventsCSVLoading) ? 'Saving CSV...' : 'Save as CSV'}
              <Tooltip content={csvTooltip}>
                <Info className = {styles.Icon} size={16}></Info>
              </Tooltip>
            </Button>
          </div>
        </div>
      );

    return content;
  }

  render() {
    const { error } = this.props;

    return (
      <Page title='Events Search'>
        <MessageEventsSearch />
        {error ? this.renderError() : this.renderCollection()}
      </Page>
    );
  }

}

const mapStateToProps = (state) => {
  const events = selectMessageEvents(state);
  const { messageEvents } = state;
  const { loading, error, search, totalCount, hasMorePagesAvailable, eventsCSV, eventsCSVLoading } = messageEvents;
  return {
    events: events,
    loading,
    error,
    empty: events.length === 0,
    search,
    totalCount,
    hasMorePagesAvailable,
    eventsCSV,
    eventsCSVLoading
  };
};

export default connect(mapStateToProps, { getMessageEvents, getMessageEventsCSV, changePage })(MessageEventsPage);
