import React, { Component } from 'react';
import { Table, Panel } from '@sparkpost/matchbox';
import { TableCollection, PageLink } from 'src/components';
import styles from './TestCollection.module.scss';

const filterBoxConfig = {
  show: true,
  itemToStringKeys: ['subject'],
  placeholder: 'Search...',
  wrapper: (props) => (
    <div className = {styles.FilterBox}>
      {props}
    </div>)
};

class TestCollection extends Component {

  getTestLink = ({ id }) => `/inbox-placement/${id}`;

  getColumns() {
    const columns = [
      { label: 'Subject Line', sortKey: 'created_at', width: '40%', className: styles.TabbedCellHeader },
      { label: 'Inbox', sortKey: 'placement.inbox' },
      { label: 'Spam', sortKey: 'placement.spam' },
      { label: 'Missing', sortKey: 'placement.missing' },
      null
    ];

    return columns;
  }

  getRowData = ({ id, subject, placement }) => (
    [
      <div className = {styles.TabbedCellBody}>
        <PageLink to={this.getTestLink({ id })}>{subject}</PageLink>
      </div>,
      <div>{placement.inbox}</div>,
      <div>{placement.spam}</div>,
      <div>{placement.missing}</div>
    ]
  )

  TableWrapper = (props) => (
    <>
      <div className={styles.TableWrapper}>
        <Table>{props.children}</Table>
      </div>
    </>
  );

  render() {
    const { tests } = this.props;

    return (
      <TableCollection
        wrapperComponent={this.TableWrapper}
        columns={this.getColumns()}
        rows={tests}
        getRowData={this.getRowData}
        pagination={true}
        filterBox={filterBoxConfig}
        defaultSortColumn='created_at'
        defaultSortDirection='desc'
      >
        {
          ({ filterBox, collection, pagination }) =>
            <>
            <Panel >
              <Panel.Section className = {styles.Title}>
                <h3>Seedlist Tests</h3>
              </Panel.Section>
              {filterBox}
              {collection}
            </Panel>
            {pagination}
          </>
        }
      </TableCollection>
    );
  }
}

export default TestCollection;
