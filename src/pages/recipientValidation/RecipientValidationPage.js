import React, { Component } from 'react';

import { Page, Tabs, Panel } from '@sparkpost/matchbox';
import ListForm from './components/ListForm';
import SingleAddressForm from './components/SingleAddressForm';
import ListResults from './components/ListResults';
import { hasUiOption } from 'src/helpers/conditions/account';
import RVDisabledPage from './components/RVDisabledPage';
import { connect } from 'react-redux';

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

  render() {

    if (!this.props.hasRecipientValidation) {
      return <RVDisabledPage/>;
    }

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
          {selectedTab === 1 ? <SingleAddressForm /> : <ListForm />}
        </Panel>
        {selectedTab === 0 && <ListResults />}
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  hasRecipientValidation: hasUiOption('recipient_validation')(state)
});

export default connect(mapStateToProps)(RecipientValidationPage);

