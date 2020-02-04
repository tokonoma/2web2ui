import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Page, Tabs, Panel, Modal, Button } from '@sparkpost/matchbox';
import { Close, Launch } from '@sparkpost/matchbox-icons';
import JobsTableCollection from './components/JobsTableCollection';
import ListForm from './components/ListForm';
import SingleAddressForm from './components/SingleAddressForm';
import ApiDetails from './components/ApiDetails';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import RVDisabledPage from './components/RVDisabledPage';
import ConditionSwitch, { Case, defaultCase } from 'src/components/auth/ConditionSwitch';
import RecipientValidationPriceTable from './components/RecipientValidationPriceTable';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import styles from './RecipientValidationPage.module.scss';
import ValidateSection from './components/ValidateSection';
import { getBillingInfo } from 'src/actions/account';
import { reduxForm } from 'redux-form';
import { FORMS } from 'src/constants';

const FORMNAME = FORMS.RV_ADDPAYMENTFORM;

const tabs = [
  { content: <span className={styles.TabPadding}>List</span>, key: 'list' },
  { content: 'Single Address', key: 'single' },
  { content: 'API Integration', key: 'api' },
];

export class RecipientValidationPage extends Component {
  state = {
    selectedTab: this.props.tab || 0,
    showPriceModal: false,
  };

  componentDidMount() {
    this.props.getBillingInfo();
  }

  handleTabs(tabIdx) {
    const { history } = this.props;

    history.replace(`/recipient-validation/${tabs[tabIdx].key}`);
    this.setState({ selectedTab: tabIdx });
  }

  renderTabContent = tabId => {
    switch (tabId) {
      case 0:
        return <ListForm />;
      case 1:
        return <SingleAddressForm />;
      case 2:
        return <ApiDetails isStandAloneRVSet={this.props.isStandAloneRVSet} />;
    }
  };

  handleModal = (showPriceModal = false) => this.setState({ showPriceModal });

  renderRVPriceModal = () => (
    <Panel className={styles.modalContainer} accent>
      <div style={{ float: 'right' }}>
        <Button onClick={() => this.handleModal(false)} flat>
          <Close />
        </Button>
      </div>
      <div className={styles.bodyContainer}>
        <h3>How was this calculated?</h3>
        <RecipientValidationPriceTable
          cellProps={{
            style: {
              padding: '8px 0',
            },
          }}
        />
      </div>
    </Panel>
  );

  renderRecipientValidation = () => {
    const { selectedTab, showPriceModal } = this.state;
    const { isStandAloneRVSet, billing, billingLoading } = this.props;

    return (
      <Page
        title="Recipient Validation"
        primaryArea={
          <Button size="large" onClick={() => this.handleModal(true)}>
            See Pricing
          </Button>
        }
      >
        <p className={styles.LeadText}>
          Recipient Validation is an easy, efficient way to verify that email addresses are valid
          before you send. We run each address through a series of checks to catch many common
          problems, including syntax errors and non-existent mailboxes, to drive better
          deliverability, cut down on fraud, and capture every opportunity.
        </p>
        {!isStandAloneRVSet && (
          <>
            <Tabs
              selected={selectedTab}
              connectBelow={true}
              tabs={tabs.map(({ content }, idx) => ({
                content,
                onClick: () => this.handleTabs(idx),
              }))}
            />

            <Panel>{this.renderTabContent(selectedTab)}</Panel>
          </>
        )}

        {isStandAloneRVSet && (
          <Panel>
            <div className={styles.TabsWrapper}>
              <Tabs
                selected={selectedTab}
                connectBelow={true}
                tabs={tabs.map(({ content }, idx) => ({
                  content,
                  onClick: () => this.handleTabs(idx),
                }))}
              />

              {selectedTab === 2 && (
                <div className={styles.TagWrapper}>
                  <Button
                    flat
                    external
                    to="https://developers.sparkpost.com/api/recipient-validation/"
                  >
                    API Docs
                    <Launch className={styles.LaunchIcon} />
                  </Button>
                </div>
              )}
            </div>
            <Panel.Section>{this.renderTabContent(selectedTab)}</Panel.Section>
          </Panel>
        )}
        {selectedTab === 0 && <JobsTableCollection />}

        {(selectedTab === 1 || selectedTab === 2) && isStandAloneRVSet && !billingLoading && (
          <ValidateSection
            credit_card={billing.credit_card}
            handleValidate={() => {}}
            submitButtonName={selectedTab === 2 ? 'Create API Key' : 'Validate'}
          />
        )}

        <Modal open={showPriceModal} onClose={() => this.handleModal(false)}>
          {this.renderRVPriceModal()}
        </Modal>
      </Page>
    );
  };

  render() {
    return !this.props.isStandAloneRVSet ? (
      <ConditionSwitch>
        <Case condition={hasAccountOptionEnabled('recipient_validation')}>
          {this.renderRecipientValidation()}
        </Case>
        <Case condition={defaultCase}>
          <RVDisabledPage />
        </Case>
      </ConditionSwitch>
    ) : (
      <form
        onSubmit={() => {
          console.log('submitted');
        }}
      >
        {this.renderRecipientValidation()}
      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tab: tabs.findIndex(({ key }) => key === props.match.params.category) || 0,
  isStandAloneRVSet: isAccountUiOptionSet('standalone_rv')(state),
  billing: state.account.billing || {},
  billingLoading: state.account.billingLoading,
});

// export default withRouter(connect(mapStateToProps, { getBillingInfo })(RecipientValidationPage));

const formOptions = { form: FORMNAME, enableReinitialize: true };
export default withRouter(
  connect(mapStateToProps, { getBillingInfo })(reduxForm(formOptions)(RecipientValidationPage)),
);
