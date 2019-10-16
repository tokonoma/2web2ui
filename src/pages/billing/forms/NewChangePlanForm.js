import React, { useEffect, useState, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import qs from 'query-string';
import _ from 'lodash';
import PlanSelectSection, { SelectedPlan } from '../components/PlanSelect';
import CurrentPlanSection from '../components/CurrentPlanSection';
import useRouter from 'src/hooks/useRouter';
import SubmitSection from '../components/SubmitSection';
import CardSection from '../components/CardSection';
import { isAws } from 'src/helpers/conditions/account';
import { not } from 'src/helpers/conditions';
import AccessControl from 'src/components/auth/AccessControl';
//Actions
import { getBillingInfo } from 'src/actions/account';
import FeatureChangeSection from '../components/FeatureChangeSection';
import { FeatureChangeContextProvider } from '../context/FeatureChangeContext';
import { getBillingCountries, getBundles, verifyPromoCode, clearPromoCode } from 'src/actions/billing';
//Selectors
import { selectTieredVisibleBundles, selectAvailableBundles, currentPlanSelector, canUpdateBillingInfoSelector, getPromoCodeObject, selectAccountBilling } from 'src/selectors/accountBillingInfo';
import { changePlanInitialValues } from 'src/selectors/accountBillingForms';
import { selectCondition } from 'src/selectors/accessConditionState';

import { Loading } from 'src/components/loading/Loading';
import styles from './NewChangePlanForm.module.scss';


const FORMNAME = 'changePlan';

export const ChangePlanForm = ({
  //Redux Props
  account,
  bundles,
  billing,
  currentPlan,
  loading,
  allBundles,
  canUpdateBillingInfo,
  //Redux Actions
  getBillingInfo,
  getBillingCountries,
  verifyPromoCode,
  promoCodeObj,
  clearPromoCode,
  getBundles
}) => {
  useEffect(() => { getBillingCountries(); }, [getBillingCountries]);
  useEffect(() => { getBillingInfo(); }, [getBillingInfo]);
  const gotBundles = useRef(false);
  useEffect(() => { getBundles().then(() => { gotBundles.current = true; }); }, [getBundles]);

  const { requestParams: { code, promo } = {}, updateRoute } = useRouter();
  const [selectedBundle, selectBundle] = useState();
  const { countries } = billing;
  const onSelect = (plan) => {
    if (!plan) {
      updateRoute({});
    }
    selectBundle(plan);
  };
  useEffect(() => {
    const bundle = allBundles.find(({ bundle }) => bundle === code);
    if (bundle) {
      selectBundle(bundle);
    } else if (!bundle && gotBundles.current) { //Can't find bundle, clears params
      updateRoute({});
    }
  }, [ code, allBundles, updateRoute ]);
  const isPlanSelected = Boolean(selectedBundle && currentPlan.plan !== selectedBundle.bundle);

  // const [useSavedCC, setUseSavedCC] = useState(null);
  const applyPromoCode = useCallback((promoCode) => {
    const { billingId } = selectedBundle;
    verifyPromoCode({ promoCode , billingId, meta: { promoCode, showErrorAlert: false }});
  },[selectedBundle, verifyPromoCode]);

  useEffect(() => { if (!selectedBundle) { clearPromoCode(); } },[clearPromoCode, selectedBundle]);

  //Applies promo code if in query param
  useEffect(() => {
    if (promo && selectedBundle) { applyPromoCode(promo); }
  },[applyPromoCode, promo, selectedBundle, verifyPromoCode]);

  if (loading) {
    return <Loading />;
  }

  return (
    <form>
      <div className={styles.ChangePlanForm}>
        <div className={styles.CurrentPlanSection}>
          <CurrentPlanSection currentPlan={currentPlan} isPlanSelected={Boolean(selectedBundle)}/>
        </div>
        <div className={styles.MainContent}>
          {
            isPlanSelected
              ? <>
              <SelectedPlan
                bundle={selectedBundle}
                onChange={onSelect}
                promoCodeObj = {promoCodeObj}
                handlePromoCode = {
                  {
                    applyPromoCode: applyPromoCode,
                    clearPromoCode: clearPromoCode
                  }
                }
              />
              <FeatureChangeContextProvider selectedBundle={selectedBundle}>
                <FeatureChangeSection/>
                <SubmitSection />
              </FeatureChangeContextProvider>
               <AccessControl condition={not(isAws)}>
                 <CardSection
                   account={account}
                   countries={countries}
                   selectedPlan={selectedBundle}
                   canUpdateBillingInfo={canUpdateBillingInfo}
                   submitting={true}
                 />
               </AccessControl>
               </>
              : <PlanSelectSection
                onSelect={onSelect}
                bundles={bundles}
                currentPlan={currentPlan}
              />
          }
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state, props) => {
  const { code: planCode, promo: promoCode } = qs.parse(props.location.search);
  const { account } = selectAccountBilling(state);
  return {
    account,
    bundles: selectTieredVisibleBundles(state),
    allBundles: selectAvailableBundles(state),
    initialValues: changePlanInitialValues(state, { planCode, promoCode }),
    billing: state.billing,
    canUpdateBillingInfo: canUpdateBillingInfoSelector(state),
    currentPlan: currentPlanSelector(state),
    isAws: selectCondition(isAws)(state),
    promoCodeObj: getPromoCodeObject(state)
  };
};

const mapDispatchToProps = ({
  getBillingInfo,
  getBillingCountries,
  verifyPromoCode,
  clearPromoCode,
  getBundles
});

const formOptions = {
  form: FORMNAME,
  enableReinitialize: true
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm(formOptions)(ChangePlanForm)
  )
);
