import React, { useEffect, useMemo } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Grid, Button, Panel } from 'src/components/matchbox';
import { Heading } from 'src/components/text';
import { showAlert } from 'src/actions/globalAlert';
import { CenteredLogo, Loading, PlanPicker } from 'src/components';
import {
  getBillingCountries,
  verifyPromoCode,
  clearPromoCode,
  getPlans,
  getBundles,
} from 'src/actions/billing';
import billingCreate from 'src/actions/billingCreate';
import { choosePlanMSTP } from 'src/selectors/onboarding';
import promoCodeValidate from 'src/pages/billing/helpers/promoCodeValidate';
import { prepareCardInfo } from 'src/helpers/billing';
import PromoCodeNew from '../../components/billing/PromoCodeNew';
import { FORMS } from 'src/constants';
import CreditCardSection from './components/CreditCardSection';
import _ from 'lodash';
import { DASHBOARD_ROUTE } from 'src/constants';

export function OnboardingPlanPage({
  getPlans,
  getBundles,
  getBillingCountries,
  billingCreate,
  showAlert,
  history,
  billing,
  verifyPromoCode,
  clearPromoCode,
  currentPlan,
  loading,
  submitting,
  selectedPlan = {},
  handleSubmit,
  hasError,
  bundles,
}) {
  const next_step = DASHBOARD_ROUTE;
  useEffect(() => {
    getPlans();
  }, [getPlans]);

  useEffect(() => {
    getBundles({ type: 'messaging' });
  }, [getBundles]);

  useEffect(() => {
    getBillingCountries();
  }, [getBillingCountries]);

  useEffect(() => {
    // if we can't get plans or countries form is useless
    // they can pick plan later from billing
    if (hasError) {
      history.push(next_step);
    }
  }, [next_step, hasError, history]);

  const isPlanFree = useMemo(() => Boolean(!_.get(selectedPlan, 'messaging.price', true)), [
    selectedPlan,
  ]);

  const onSubmit = values => {
    const selectedPromo = billing.selectedPromo;
    const newValues =
      values.card && !isPlanFree ? { ...values, card: prepareCardInfo(values.card) } : values;

    // no billing updates needed since they are still on free plan
    if (isPlanFree) {
      history.push(next_step);
      return;
    }
    const billingId = values.planpicker.messaging.billing_id;

    let action = Promise.resolve({});
    if (selectedPromo.promoCode && !isPlanFree) {
      const { promoCode } = selectedPromo;
      newValues.promoCode = promoCode;
      action = verifyPromoCode({
        promoCode,
        billingId,
        meta: { promoCode, showErrorAlert: false },
      });
    }

    // Note: billingCreate will update the subscription if the account is AWS
    return action
      .then(({ discount_id }) => {
        newValues.discountId = discount_id;
        return billingCreate({ ...newValues, billingId });
      })
      .then(() => history.push(next_step))
      .then(() => showAlert({ type: 'success', message: 'Added your plan' }));
  };

  const applyPromoCode = promoCode => {
    verifyPromoCode({
      promoCode,
      billingId: selectedPlan.messaging.billing_id,
      meta: { promoCode, showErrorAlert: false },
    });
  };

  const onPlanSelect = e => {
    if (currentPlan !== e.code) {
      clearPromoCode();
    }
  };

  const { selectedPromo = {}, promoError, promoPending } = billing;
  const promoCodeObj = {
    selectedPromo: selectedPromo,
    promoError: promoError,
    promoPending: promoPending,
  };
  const handlePromoCode = {
    applyPromoCode,
    clearPromoCode,
  };

  if (loading || !bundles.length) {
    return <Loading />;
  }
  const disableSubmit = submitting || promoPending;

  const buttonText = submitting ? 'Updating Subscription...' : 'Get Started';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenteredLogo />
      <Grid>
        <Grid.Column>
          <Panel>
            <Panel.Section>
              <Heading as="h3">Select A Plan</Heading>
            </Panel.Section>
            <PlanPicker
              selectedPromo={selectedPromo}
              disabled={disableSubmit}
              bundles={bundles}
              onChange={onPlanSelect}
            />
            {!isPlanFree && (
              <Panel.Section>
                <PromoCodeNew
                  key={selectedPromo.promoCode || 'promocode'}
                  promoCodeObj={promoCodeObj}
                  handlePromoCode={handlePromoCode}
                />
              </Panel.Section>
            )}
            <CreditCardSection billing={billing} submitting={submitting} isPlanFree={isPlanFree} />
            <Panel.Section>
              <Button disabled={disableSubmit} type="submit" variant="primary">
                {buttonText}
              </Button>
            </Panel.Section>
          </Panel>
        </Grid.Column>
      </Grid>
    </form>
  );
}

const formOptions = {
  form: FORMS.JOIN_PLAN,
  enableReinitialize: true,
  asyncValidate: promoCodeValidate(FORMS.JOIN_PLAN),
  asyncChangeFields: ['planpicker'],
  asyncBlurFields: ['promoCode'],
};

export default connect(choosePlanMSTP(FORMS.JOIN_PLAN), {
  billingCreate,
  showAlert,
  getPlans,
  getBillingCountries,
  verifyPromoCode,
  clearPromoCode,
  getBundles,
})(reduxForm(formOptions)(OnboardingPlanPage));
