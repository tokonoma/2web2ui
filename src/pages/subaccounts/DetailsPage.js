import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Route, Switch } from 'react-router-dom';
import { Page, Tabs } from '@sparkpost/matchbox';

import { getSubaccount } from 'src/actions/subaccounts';
import { selectSubaccount, selectDetailTabs } from 'src/selectors/subaccounts';
import { listPools } from 'src/actions/ipPools';
import { listApiKeys } from 'src/actions/api-keys';

import ApiKeysTab from './components/ApiKeysTab';
import EditTab from './components/EditTab';
import PanelLoading from 'src/components/panelLoading/PanelLoading';

const breadcrumbAction = {
  content: 'Subaccounts',
  Component: Link,
  to: '/account/subaccounts'
};

export class DetailsPage extends Component {

  componentDidMount() {
    this.props.getSubaccount(this.props.id);
    this.props.listPools();
    this.props.listApiKeys();
  }

  render() {
    const { loading, location, tabs } = this.props;
    const selectedTab = location.pathname.endsWith('keys') ? 1 : 0;

    if (loading) {
      return (
        <Page title={'loading...'} breadcrumbAction={breadcrumbAction} >
          <Tabs selected={selectedTab} tabs={tabs} />
          <PanelLoading />
        </Page>
      );
    }
    const { match, subaccount } = this.props;

    return (
      <Page title={`${subaccount.name} (${subaccount.id})`} breadcrumbAction={breadcrumbAction}>
        <Tabs selected={selectedTab} tabs={tabs} />
        <Switch>
          <Route exact path={match.url} render={() => <EditTab subaccount={subaccount} />} />
          <Route path={`${match.url}/api-keys`} render={() => <ApiKeysTab id={subaccount.id}/>} />
        </Switch>
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { subaccounts } = state;
  return {
    id: props.match.params.id,
    loading: subaccounts.getLoading,
    subaccount: selectSubaccount(state),
    tabs: selectDetailTabs(state, props)
  };
};

export default withRouter(
  connect(mapStateToProps, { getSubaccount, listPools, listApiKeys })(DetailsPage)
);
