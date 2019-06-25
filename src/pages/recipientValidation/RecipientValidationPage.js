import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Page, Tabs, Panel } from '@sparkpost/matchbox';
import ListForm from './components/ListForm';
import SingleAddressForm from './components/SingleAddressForm';
import ListResults from './components/ListResults';
import ApiDetails from './components/ApiDetails';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import RVDisabledPage from './components/RVDisabledPage';
import ConditionSwitch, { Case, defaultCase } from 'src/components/auth/ConditionSwitch';

import styles from './RecipientValidationPage.module.scss';

const tabs = [
  { content: <span className={styles.TabPadding}>List</span>, key: 'list'},
  { content: 'Single Address', key: 'single' },
  { content: 'API Integration', key: 'api' }
];

export class RecipientValidationPage extends Component {
  state = {
    selectedTab: this.props.tab || 0
  };

  handleTabs(tabIdx) {
    const { history } = this.props;

    history.replace(`/recipient-validation/${tabs[tabIdx].key}`);
    this.setState({ selectedTab: tabIdx });
  }

  renderTabContent = (tabId) => {
    switch (tabId) {
      case 0:
        return <ListForm />;
      case 1:
        return <SingleAddressForm />;
      case 2:
        return <ApiDetails />;
      default:
        return null;
    }
  }

  renderRecipientValidation = () => {
    const { selectedTab } = this.state;

    return (
      <Page
        title='Recipient Validation'>
        <Tabs
          selected={selectedTab}
          connectBelow={true}
          tabs={tabs.map(({ content }, idx) => ({ content, onClick: () => this.handleTabs(idx) }))}
        />
        <Panel>
          {this.renderTabContent(selectedTab)}
        </Panel>
        {selectedTab === 0 && <ListResults/>}
      </Page>
    );
  };

  render() {
    return (
      <ConditionSwitch>
        <Case condition={hasAccountOptionEnabled('recipient_validation')}>
          {this.renderRecipientValidation()}
        </Case>
        <Case condition={defaultCase}>
          <RVDisabledPage/>
        </Case>
      </ConditionSwitch>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tab: tabs.findIndex(({ key }) => key === props.match.params.category) || 0
});

export default withRouter(connect(mapStateToProps)(RecipientValidationPage));
