import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page } from '@sparkpost/matchbox';
import { fetch as fetchAccount, getPlans, getBillingInfo, getUsage } from 'src/actions/account';
import { list as getSendingIps } from 'src/actions/sendingIps';
import { selectBillingInfo, selectAccountBilling } from 'src/selectors/accountBillingInfo';
import { selectAccountAgeInDays } from 'src/selectors/accountAge';
import ConditionSwitch, { defaultCase } from 'src/components/auth/ConditionSwitch';
import { getSubscription } from 'src/actions/billing';
import { isSuspendedForBilling, hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import { Loading } from 'src/components';
import BillingSummary from './components/BillingSummary';
import ManuallyBilledBanner from './components/ManuallyBilledBanner';
import SuspendedForBilling from './components/SuspendedForBilling';
import { list as getInvoices } from 'src/actions/invoices';
import { isBillingSubscriptionSelfServe, isAws } from 'src/helpers/conditions/account';
import { any } from 'src/helpers/conditions';
export class BillingSummaryPage extends Component {
  componentDidMount() {
    const {
      fetchAccount,
      getSubscription,
      getBillingInfo,
      getPlans,
      getSendingIps,
      getInvoices,
      getUsage,
    } = this.props;
    fetchAccount();
    getSubscription();
    getBillingInfo();
    getPlans();
    getSendingIps();
    getInvoices();
    getUsage();
  }
  componentDidUpdate(prevProps) {
    if (this.props.billingInfo !== prevProps.billingInfo) {
      getSubscription();
    }
  }
  renderBillingSummary = () => {
    const {
      account,
      billingInfo,
      sendingIps,
      invoices,
      accountAgeInDays,
      hasRecipientValidation,
      subscription,
    } = this.props;
    const suspendedBilling = (
      <SuspendedForBilling
        condition={isSuspendedForBilling}
        account={account}
        key={'suspended-billing'}
      />
    );
    const manuallyBilledBanner = (
      <ManuallyBilledBanner
        account={account}
        onZuoraPlan={billingInfo.onZuoraPlan}
        condition={any(isAws, () => !isBillingSubscriptionSelfServe(billingInfo))}
        key={'manually-billed-banner'}
      />
    );
    const billingSummary = (
      <BillingSummary
        condition={defaultCase}
        hasRecipientValidation={hasRecipientValidation}
        account={account}
        subscription={subscription}
        {...billingInfo}
        invoices={invoices}
        sendingIps={sendingIps}
        accountAgeInDays={accountAgeInDays}
        key={'billing-summary'}
      />
    );
    return [suspendedBilling, manuallyBilledBanner, billingSummary];
  };
  render() {
    const { loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <Page title="Billing">
        <ConditionSwitch>{this.renderBillingSummary()}</ConditionSwitch>
      </Page>
    );
  }
}
const mapStateToProps = state => {
  const { loading, account } = selectAccountBilling(state);
  return {
    loading: loading || state.billing.plansLoading || !state.account.subscription,
    account,
    subscription: state.billing.subscription || {},
    accountAgeInDays: selectAccountAgeInDays(state),
    billingInfo: selectBillingInfo(state),
    sendingIps: state.sendingIps.list,
    invoices: state.invoices.list,
    hasRecipientValidation: hasAccountOptionEnabled('recipient_validation')(state),
  };
};
export default connect(mapStateToProps, {
  getInvoices,
  getSendingIps,
  getPlans,
  fetchAccount,
  getBillingInfo,
  getUsage,
  getSubscription,
})(BillingSummaryPage);
