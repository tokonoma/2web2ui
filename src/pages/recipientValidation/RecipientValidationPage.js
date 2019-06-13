import React, { Component } from 'react';

import { Page, Tabs, Panel } from '@sparkpost/matchbox';
import ListForm from './components/ListForm';
import SingleAddressForm from './components/SingleAddressForm';
import ListResults from './components/ListResults';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import RVDisabledPage from './components/RVDisabledPage';
import ConditionSwitch, { Case, defaultCase } from 'src/components/auth/ConditionSwitch';

const tabs = [
  { content: 'Validate A List' },
  { content: 'Validate a Single Address' }
];

export class RecipientValidationPage extends Component {
  state = {
    selectedTab: 0
  };

  handleTabs(tabIdx) {
    this.setState({ selectedTab: tabIdx });
  }

  renderRecipientValidation = () => {

    const { selectedTab } = this.state;

    return (
      <Page
        title='Recipient Email Validation'>
        <Tabs
          selected={selectedTab}
          connectBelow={true}
          tabs={tabs.map(({ content }, idx) => ({ content, onClick: () => this.handleTabs(idx) }))}
        />
        <Panel>
          {selectedTab === 1 ? <SingleAddressForm/> : <ListForm/>}
        </Panel>
        {selectedTab === 0 && <ListResults/>}
      </Page>
    );
  }
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

export default RecipientValidationPage;

