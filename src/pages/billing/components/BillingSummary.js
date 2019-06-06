import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Panel, UnstyledLink } from '@sparkpost/matchbox';
import { Modal, LabelledValue } from 'src/components';
import { PremiumBanner, EnterpriseBanner, PendingPlanBanner, FreePlanWarningBanner } from './Banners';
import UpdatePaymentForm from '../forms/UpdatePaymentForm';
import UpdateContactForm from '../forms/UpdateContactForm';
import AddIps from '../forms/AddIps';
import DedicatedIpSummarySection from './DedicatedIpSummarySection';
import InvoiceHistory from './InvoiceHistory';
import CardSummary from './CardSummary';
import PlanSummary from './PlanSummary';
import RecipientValidationModal from './RecipientValidationModal';
import { formatFullNumber, formatCurrency } from 'src/helpers/units';
import { RECIPIENT_TIERS } from 'src/constants';

const PAYMENT_MODAL = 'payment';
const CONTACT_MODAL = 'contact';
const IP_MODAL = 'ip';
const RV_MODAL = 'recipient_validation';

export default class BillingSummary extends Component {
  state = {
    show: false,
    showCloseButton: false
  }

  handleModal = (modal = false, showCloseButton = false) => {
    this.setState({ show: this.state.show ? false : modal, showCloseButton });
  }

  handlePaymentModal = () => this.handleModal(PAYMENT_MODAL);
  handleContactModal = () => this.handleModal(CONTACT_MODAL);
  handleIpModal = () => this.handleModal(IP_MODAL);
  handleRvModal = () => this.handleModal(RV_MODAL, true);

  renderSummary = () => {
    const { account } = this.props;
    const { billing } = account;
    return (
      <Panel title='Billing'>
        <Panel.Section actions={[{ content: 'Update Payment Information', onClick: this.handlePaymentModal, color: 'orange' }]}>
          <CardSummary label='Credit Card' billing={billing} />
        </Panel.Section>
        <Panel.Section actions={[{ content: 'Update Billing Contact', onClick: this.handleContactModal, color: 'orange' }]}>
          <LabelledValue label='Billing Contact'>
            <h6>{billing.first_name} {billing.last_name}</h6>
            <p>{billing.email}</p>
          </LabelledValue>
        </Panel.Section>
      </Panel>
    );
  }

  renderDedicatedIpSummarySection = () => (
    <DedicatedIpSummarySection
      count={this.props.sendingIps.length}
      plan={this.props.currentPlan}
      onClick={this.handleIpModal}
      isAWSAccount={this.props.isAWSAccount}
    />
  );

  renderRecipientValidationSection = () => {
    const { account } = this.props;
    const { usage } = account;

    const { recipient_validation } = usage;
    const volumeUsed = recipient_validation.month.used;

    let totalCost = 0;

    RECIPIENT_TIERS.forEach(({ volumeMax, volumeMin, cost }) => {
      const tierCost = Math.max(Math.min(volumeMax, volumeUsed) - volumeMin, 0) * cost;
      totalCost += tierCost;
    });

    return (
      <Panel.Section>
        <LabelledValue label="Recipient Validation">
          <h6>{formatFullNumber(volumeUsed)} emails validated for {formatCurrency(totalCost)}<small> as of {new Date(recipient_validation.timestamp).toLocaleDateString()}</small></h6>
          <UnstyledLink onClick={this.handleRvModal}>How was this calculated?</UnstyledLink>
        </LabelledValue>
      </Panel.Section>
    );
  };

  render() {
    const { account, currentPlan, canChangePlan, canUpdateBillingInfo, canPurchaseIps, invoices, isAWSAccount, accountAgeInDays } = this.props;
    const { usage, usageLoading } = account;
    const { show, showCloseButton } = this.state;
    let changePlanActions = {};

    if (canChangePlan) {
      const changePlanLabel = currentPlan.isFree ? 'Upgrade Now' : 'Change Plan';
      changePlanActions = { actions: [{ content: changePlanLabel, to: '/account/billing/plan', Component: Link, color: 'orange' }]};
    }

    return (
      <div>
        <PendingPlanBanner account={account} />
        <FreePlanWarningBanner account={account} accountAgeInDays={accountAgeInDays} />
        <Panel accent title='Plan Overview'>
          <Panel.Section {...changePlanActions}>
            <LabelledValue label="Your Plan">
              <PlanSummary plan={account.subscription} />
            </LabelledValue>
          </Panel.Section>
          {canPurchaseIps && this.renderDedicatedIpSummarySection()}
          {usage && !usageLoading && this.renderRecipientValidationSection()}
        </Panel>

        {canUpdateBillingInfo && this.renderSummary()}

        {(invoices.length > 0) && <InvoiceHistory invoices={this.props.invoices} />}

        <PremiumBanner isAWSAccount={isAWSAccount} />
        <EnterpriseBanner />

        <Modal open={!!show} showCloseButton={showCloseButton} onClose={this.handleModal}>
          {show === PAYMENT_MODAL && <UpdatePaymentForm onCancel={this.handleModal}/>}
          {show === CONTACT_MODAL && <UpdateContactForm onCancel={this.handleModal}/>}
          {show === IP_MODAL && <AddIps onClose={this.handleModal}/>}
          {show === RV_MODAL && usage && <RecipientValidationModal usage={usage} onClose={this.handleModal} />}
        </Modal>
      </div>
    );
  }

}
