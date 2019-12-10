import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Page, Panel, Table, Tooltip } from '@sparkpost/matchbox';
import { Schedule } from '@sparkpost/matchbox-icons';
import { ApiErrorBanner, Loading, PageLink } from 'src/components';
import formatScheduleLine from './helpers/formatScheduleLine';
import getStatusProps from './helpers/getStatusProps';
import formatPercentage from './helpers/formatPercentage';
import FilterSortCollection from './components/FilterSortCollection';
import Dot from './components/Dot';
import { connect } from 'react-redux';
import { listTests } from 'src/actions/inboxPlacement';
import { withRouter } from 'react-router-dom';
import styles from './TestListPage.module.scss';
import { STATUS } from './constants/test';
import { Users } from 'src/components/images';
import TrendsChart from './components/TrendsChart';
import usePageFilters from 'src/hooks/usePageFilters';
import TrendsFilters from './components/TrendsFilters';
import { formatApiTimestamp } from 'src/helpers/date';
import { RELATIVE_DATE_OPTIONS } from './constants/filters';

const selectOptions = [
  { value: 'Sort By', label: 'Sort By', disabled: true },
  { value: 'start_time', label: 'Start Time' },
  { value: 'placement.inbox_pct', label: 'Inbox' },
  { value: 'placement.spam_pct', label: 'Spam' },
  { value: 'placement.missing_pct', label: 'Missing' },
];

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['subject', 'test_name', 'from_address'],
  placeholder: 'Search By: Subject, Placement Name, From Address',
  wrapper: props => <div className={styles.FilterBox}>{props}</div>,
};

const FilterSortCollectionRow = ({
  id,
  status,
  subject,
  test_name,
  from_address,
  start_time,
  end_time,
  placement,
}) => [
  <Table.Row
    key={id}
    className={styles.TableRow}
    rowData={[
      <div className={styles.TabbedCellBody}>
        <div className={styles.SubjectContainer}>
          <div className={styles.TooltipWrapper}>
            <Tooltip
              disabled={status === STATUS.COMPLETED}
              width={'5.8rem'}
              horizontalOffset={'-1.35rem'}
              content={getStatusProps(status).tooltip}
              dark
              top
            >
              <Dot backgroundColor={getStatusProps(status).fill} />
            </Tooltip>
          </div>
          <div className={styles.Subject}>
            <PageLink to={`/inbox-placement/details/${id}`}>
              <strong>{subject}</strong>
            </PageLink>
          </div>
          <div className={styles.TestName}>
            {test_name && (
              <>
                <strong>{test_name}</strong>
                <strong className={styles.Divider}>{'|'}</strong>
              </>
            )}
            <span>{from_address}</span>
          </div>
          <div className={styles.TestSchedule}>
            <span>
              <Schedule className={styles.ScheduleIcon} />
            </span>
            <span>{formatScheduleLine(status, start_time, end_time)}</span>
          </div>
        </div>
      </div>,
      <div>
        <p className={styles.ColumnHeader}>Inbox</p>
        <h1 className={styles.ColumnValue}>{formatPercentage(placement.inbox_pct)}</h1>
      </div>,
      <div>
        <p className={styles.ColumnHeader}>Spam</p>
        <h1 className={styles.ColumnValue}>{formatPercentage(placement.spam_pct)}</h1>
      </div>,
      <div>
        <p className={styles.ColumnHeader}>Missing</p>
        <h1 className={styles.ColumnValue}>{formatPercentage(placement.missing_pct)}</h1>
      </div>,
    ]}
  />,
];

const now = Date.now();

const whitelistFilters = {
  dateRange: {
    defaultValue: {
      from: formatApiTimestamp(moment(now).subtract(30, 'd')),
      to: formatApiTimestamp(now),
    },
    validate: ({ from, to }) => {
      const momentFrom = moment.utc(from);
      const momentTo = moment.utc(to);
      return momentFrom.isValid() && momentTo.isValid() && momentFrom.isBefore(momentTo);
    },
  },
  range: {
    defaultValue: '30days',
    excludeFromRoute: true,
    validate: range => RELATIVE_DATE_OPTIONS.includes(range),
  },
  tags: {
    defaultValue: {
      from_domains: '',
      mailbox_providers: '',
      regions: '',
      sending_ips: '',
    },
    normalize: val =>
      Object.keys(val).reduce((acc, curr) => {
        if (val[curr]) {
          acc[curr] = val[curr];
        }
        return acc;
      }, {}),
  },
};

const TestListPage = ({ tests, error, loading, listTests }) => {
  const { filters, updateFilters } = usePageFilters(whitelistFilters);

  useEffect(() => {
    listTests();
  }, [listTests]);

  const renderCollection = useCallback(
    () => (
      <FilterSortCollection
        title={'Tests'}
        selectOptions={selectOptions}
        filterBoxConfig={filterBoxConfig}
        defaultSortColumn={'start_time'}
        rows={tests}
        rowComponent={FilterSortCollectionRow}
      />
    ),
    [tests],
  );

  const renderPage = useCallback(
    () => (
      <>
        <p className={styles.Description}>
          An Inbox Placement Test can tell you if you are actually landing in the recipients inbox.
          We can provide insight into what mailbox providers are doing with your email.
        </p>
        <Panel title={'Inbox Placement Trends'}>
          <Panel.Section>
            <TrendsFilters filters={filters} updateFilters={updateFilters} />
          </Panel.Section>

          <TrendsChart filters={filters} />
          {renderCollection()}
        </Panel>
      </>
    ),
    [filters, renderCollection, updateFilters],
  );

  const renderError = useCallback(
    () => (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your tests.'}
        errorDetails={error.message}
        reload={listTests}
      />
    ),
    [error, listTests],
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Page
      empty={{
        show: !error && tests.length === 0,
        title: 'Find and Fix Inbox Placement Issues',
        image: Users,
        content: (
          <p>
            Perform seedlist tests that help you predict how your emails are handled by mailbox
            providers.
          </p>
        ),
      }}
      title="Inbox Placement"
      primaryAction={{
        content: 'Start a Test',
        to: '/inbox-placement/seedlist',
        component: Link,
      }}
    >
      {error ? renderError() : renderPage()}
    </Page>
  );
};

const mapStateToProps = state => ({
  tests: state.inboxPlacement.tests || [],
  error: state.inboxPlacement.testsError,
  loading: state.inboxPlacement.testsPending,
});

export default withRouter(connect(mapStateToProps, { listTests })(TestListPage));
