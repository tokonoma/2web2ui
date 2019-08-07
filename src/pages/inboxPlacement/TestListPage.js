import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page, Table, Tooltip } from '@sparkpost/matchbox';
import { Schedule } from '@sparkpost/matchbox-icons';
import { ApiErrorBanner, Loading, PageLink } from 'src/components';
import formatScheduleLine from './helpers/formatScheduleLine';
import getStatusProps from './helpers/getStatusProps';
import formatPercentage from './helpers/formatPercentage';
import FilterSortCollection from './components/FilterSortCollection';
import Dot from './components/Dot';
import withTestList from './containers/TestListPage.container';
import styles from './TestListPage.module.scss';
import { STATUS } from './constants/test';
import EmptyTestListPage from './EmptyTestListPage';

const selectOptions = [
  { value: 'Sort By', label: 'Sort By', disabled: true },
  { value: 'start_time', label: 'Start Time' },
  { value: 'placement.inbox', label: 'Inbox' },
  { value: 'placement.spam', label: 'Spam' },
  { value: 'placement.missing', label: 'Missing' }
];

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['subject', 'test_name', 'from_address'],
  placeholder: 'Search By: Subject, Placement Name, From Address',
  wrapper: (props) => (
    <div className = {styles.FilterBox}>
      {props}
    </div>)
};

const FilterSortCollectionRow = ({ id, status, subject, test_name, from_address, start_time, end_time, placement }, iterator) => (
  [
    <Table.Row
      key={iterator}
      className={styles.TableRow}
      rowData={[
        <div className = {styles.TabbedCellBody}>
          <div className = {styles.SubjectContainer}>
            <div className={styles.TooltipWrapper}>
              <Tooltip
                disabled={status === STATUS.COMPLETED}
                width={'5.8rem'}
                horizontalOffset={'-1.35rem'}
                content={getStatusProps(status).tooltip}
                dark
                top
              >
                <Dot backgroundColor={getStatusProps(status).fill}/>
              </Tooltip>
            </div>
            <div className={styles.Subject}>
              <PageLink to={`/inbox-placement/details/${id}`}>
                <strong>{subject}</strong>
              </PageLink>
            </div>
            <div className = {styles.TestName}>
              <span><strong>{test_name}</strong></span>
              <span className = {styles.Divider}><strong>{'|'}</strong></span>
              <span>{from_address}</span>
            </div>
            <div className = {styles.TestSchedule}>
              <span ><Schedule className={styles.ScheduleIcon}/></span>
              <span>{formatScheduleLine(status, start_time, end_time)}</span>
            </div>
          </div>
        </div>,
        <div><p className={styles.ColumnHeader}>Inbox</p><h1 className={styles.ColumnValue}>{formatPercentage(placement.inbox)}</h1></div>,
        <div><p className={styles.ColumnHeader}>Spam</p><h1 className={styles.ColumnValue}>{formatPercentage(placement.spam)}</h1></div>,
        <div><p className={styles.ColumnHeader}>Missing</p><h1 className={styles.ColumnValue}>{formatPercentage(placement.missing)}</h1></div>
      ]}
    />
  ]
);

export class TestListPage extends Component {

  componentDidMount() {
    this.props.listTests();
  }

  renderCollection() {
    return (
      <FilterSortCollection
        title={'Tests'}
        selectOptions={selectOptions}
        filterBoxConfig={filterBoxConfig}
        defaultSortColumn={'start_time'}
        rows={this.props.tests}
        rowComponent={FilterSortCollectionRow}
      />
    );
  }

  renderPage() {
    return (
      <>
        <p className={styles.Description}>
          An Inbox Placement Test can tell you if you are actually landing in the recipients inbox. We can provide insight into what mailbox providers are doing with your email.
        </p>
        {this.renderCollection()}
        </>
    );
  }

  renderError() {
    const { error, listTests } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your tests.'}
        errorDetails={error.message}
        reload={listTests}
      />
    );
  }

  render() {
    const { tests, error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      (!error && tests.length === 0)
        ? <EmptyTestListPage />
        : <Page
          title='Inbox Placement'
          primaryAction={{ content: 'Start a Test', to: '/inbox-placement/seedlist', component: Link }}
        >
          {error ? this.renderError() : this.renderPage()}
        </Page>
    );
  }
}

export default withTestList(TestListPage);
