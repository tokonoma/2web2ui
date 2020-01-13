import React from 'react';
import ChangePlanPage from './ChangePlanPage';
import { ChangePlanProvider } from './context/ChangePlanContext';
import { getBillingInfo } from 'src/actions/account';
import { getSubscription, getBundles, getPlans, getBillingCountries } from 'src/actions/billing';
import { selectAvailableBundles, selectAccountBilling } from 'src/selectors/accountBillingInfo';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { connect } from 'react-redux';

const ChangePlanPageContainer = ({ newChangePlan, ...props }) =>
  newChangePlan ? ( //TODO: Remove conditional check after replacing changeplanform
    <ChangePlanProvider {...props}>
      <ChangePlanPage />
    </ChangePlanProvider>
  ) : (
    <ChangePlanPage />
  );

const mapDispatchToProps = {
  getSubscription,
  getBundles,
  getPlans,
  getBillingInfo,
  getBillingCountries,
};

const mapStateToProps = state => {
  const { account, loading: accountLoading } = selectAccountBilling(state);
  const { countriesLoading, plansLoading, bundlesLoading } = state.billing;
  return {
    subscription: state.billing.subscription,
    plans: state.billing.bundlePlans,
    bundles: selectAvailableBundles(state),
    loading: countriesLoading || plansLoading || bundlesLoading || accountLoading,
    billingCountries: state.billing.countries,
    account,
    newChangePlan: isAccountUiOptionSet('account_feature_limits')(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePlanPageContainer);
