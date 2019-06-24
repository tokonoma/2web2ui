import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page } from '@sparkpost/matchbox';
import { fetch as fetchAccount, getPlans, getBillingInfo, getUsage, renewAccount } from 'src/actions/account';
import { list as getSendingIps } from 'src/actions/sendingIps';
import { selectBillingInfo, selectAccountBilling } from 'src/selectors/accountBillingInfo';
import { selectAccountAgeInDays } from 'src/selectors/accountAge';
import ConditionSwitch, { defaultCase } from 'src/components/auth/ConditionSwitch';
import { not } from 'src/helpers/conditions';
import { configFlag } from 'src/helpers/conditions/config';
import { isSuspendedForBilling, isSelfServeBilling, hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import { Loading } from 'src/components';
import BillingSummary from './components/BillingSummary';
import ManuallyBilledBanner from './components/ManuallyBilledBanner';
import SuspendedForBilling from './components/SuspendedForBilling';
import { list as getInvoices } from 'src/actions/invoices';
import { prepBrightback } from 'src/actions/brightback';
import { selectBrightbackData } from 'src/selectors/brightback';
import config from 'src/config';
import { showAlert } from 'src/actions/globalAlert';

export class BillingSummaryPage extends Component {

  componentDidMount() {
    const { fetchAccount, getBillingInfo, getPlans, getSendingIps, getInvoices, getUsage, brightbackEnabled, prepBrightback, brightbackData } = this.props;
    fetchAccount();
    getBillingInfo();
    getPlans();
    getSendingIps();
    getInvoices();
    getUsage();
    if (brightbackEnabled) {
      prepBrightback(brightbackData);
    }
  }

  onRenewAccount = () => {
    const { renewAccount, fetchAccount, showAlert } = this.props;
    return renewAccount().then(() => {
      showAlert({ type: 'success', message: 'Your account has been renewed.' });
      return fetchAccount();
    });
  }


  render() {
    const { loading, account, brightback, billingInfo, sendingIps, invoices, accountAgeInDays, hasRecipientValidation, renewAccount, fetchAccount } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page title='Billing'>
        <ConditionSwitch>
          <SuspendedForBilling condition={isSuspendedForBilling} account={account} />
          <ManuallyBilledBanner condition={not(isSelfServeBilling)} account={account} onZuoraPlan={billingInfo.onZuoraPlan} />
          <BillingSummary
            onRenewAccount={this.onRenewAccount}
            fetchAccount={fetchAccount}
            brightback={brightback}
            condition={defaultCase}
            renewAccount={renewAccount}
            hasRecipientValidation={hasRecipientValidation}
            account={account}
            {...billingInfo} invoices={invoices}
            sendingIps={sendingIps}
            accountAgeInDays={accountAgeInDays}
          />
        </ConditionSwitch>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading } = selectAccountBilling(state);

  return ({
    loading: loading || state.billing.plansLoading || !state.account.subscription || state.brightback.loading,
    account: state.account,
    brightback: state.brightback,
    brightbackEnabled: configFlag('brightback.enabled')(),
    brightbackData: selectBrightbackData(state, { config: config.brightback.cancelConfig }),
    accountAgeInDays: selectAccountAgeInDays(state),
    billingInfo: selectBillingInfo(state),
    sendingIps: state.sendingIps.list,
    invoices: state.invoices.list,
    hasRecipientValidation: hasAccountOptionEnabled('recipient_validation')(state)
  });
};

export default connect(mapStateToProps, { getInvoices, getSendingIps, getPlans, fetchAccount, getBillingInfo, renewAccount, getUsage, prepBrightback, showAlert })(BillingSummaryPage);
