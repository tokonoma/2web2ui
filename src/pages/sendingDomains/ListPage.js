import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { list as listDomains } from 'src/actions/sendingDomains';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { hasUnverifiedDomains } from 'src/selectors/sendingDomains';
import { Loading, TableCollection, SubaccountTag, DomainStatusTag, ApiErrorBanner } from 'src/components';
import { Page, UnstyledLink } from '@sparkpost/matchbox';
import ReadyFor from './components/ReadyFor';
import UnverifiedWarningBanner from './components/UnverifiedWarningBanner';
import StatusTooltip from './components/StatusTooltip';
import { resolveStatus, resolveReadyFor } from 'src/helpers/domains';

const StatusHeader = <StatusTooltip>Status</StatusTooltip>;

export class ListPage extends Component {
  componentDidMount() {
    this.props.listDomains();
  }

  getColumns = () => {
    const { hasSubaccounts } = this.props;

    const columns = [
      { label: 'Domain', width: '30%', sortKey: 'domain' },
      { label: StatusHeader, width: '40%' }
    ];

    if (hasSubaccounts) {
      columns.push({ label: 'Subaccount', width: '20%', sortKey: (sd) => [sd.subaccount_id, sd.shared_with_subaccounts]});
    }

    return columns;
  }

  getStatusCell = ({ status, is_default_bounce_domain }) => {
    const domainStatus = resolveStatus(status);

    if (domainStatus !== 'verified') {
      return <DomainStatusTag status={domainStatus} />;
    }

    return <ReadyFor {...resolveReadyFor(status)} bounceDefault={is_default_bounce_domain} />;
  }

  getRowData = (row) => {
    const { hasSubaccounts } = this.props;
    const { domain, shared_with_subaccounts, subaccount_id } = row;

    const rowData = [
      <UnstyledLink Component={Link} to={`/account/sending-domains/edit/${domain}`}>{domain}</UnstyledLink>,
      this.getStatusCell(row)
    ];

    if (hasSubaccounts) {
      const subaccountCol = subaccount_id || shared_with_subaccounts
        ? <SubaccountTag all={shared_with_subaccounts} id={subaccount_id} />
        : null;

      rowData.push(subaccountCol);
    }

    return rowData;
  }

  renderCollection() {
    return (
      <TableCollection
        columns={this.getColumns()}
        getRowData={this.getRowData}
        pagination={true}
        rows={this.props.domains}
        filterBox={{
          show: true,
          itemToStringKeys: ['domain'],
          exampleModifiers: ['domain', 'subaccount_id']
        }}
        defaultSortColumn='domain'
      />
    );
  }

  renderError() {
    return (
      <ApiErrorBanner
        errorDetails={this.props.listError.message}
        message="Sorry, we seem to have had some trouble loading your domains."
        reload={this.props.listDomains}
      />
    );
  }

  render() {
    const { listError, listLoading, domains, hasUnverifiedDomains } = this.props;

    if (listLoading) {
      return <Loading />;
    }

    const primaryAction = {
      content: 'Add a Domain',
      Component: Link,
      to: '/account/sending-domains/create'
    };

    return (
      <Page
        title='Sending Domains'
        primaryAction={primaryAction}
        empty={{
          show: domains.length === 0,
          title: 'Manage Your Domains',
          content: <p>Create and configure your sending and bounce domains.</p>,
          image: 'Setup',
          secondaryAction: {
            content: 'Learn more',
            to: 'https://www.sparkpost.com/docs/getting-started/setting-up-domains/',
            external: true
          }
        }}>
        {hasUnverifiedDomains && <UnverifiedWarningBanner />}
        {listError ? this.renderError() : this.renderCollection()}
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  domains: state.sendingDomains.list,
  listError: state.sendingDomains.listError,
  hasSubaccounts: hasSubaccounts(state),
  hasUnverifiedDomains: hasUnverifiedDomains(state),
  listLoading: state.sendingDomains.listLoading
});

export default connect(mapStateToProps, { listDomains })(ListPage);
