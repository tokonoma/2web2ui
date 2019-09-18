import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Panel, Grid, Button } from '@sparkpost/matchbox';
import { showAlert } from 'src/actions/globalAlert';
import { CenteredLogo, Loading, PlanPicker } from 'src/components';
import Steps from './components/Steps';
import { getPlans } from 'src/actions/account';
import { getBillingCountries, verifyPromoCode, clearPromoCode } from 'src/actions/billing';
import billingCreate from 'src/actions/billingCreate';
import { choosePlanMSTP } from 'src/selectors/onboarding';
import promoCodeValidate from 'src/pages/billing/helpers/promoCodeValidate';
import { isAws } from 'src/helpers/conditions/account';
import { not } from 'src/helpers/conditions';
import AccessControl from 'src/components/auth/AccessControl';
import { prepareCardInfo } from 'src/helpers/billing';
import PromoCodeNew from '../../components/billing/PromoCodeNew';
import { FORMS } from 'src/constants';
import CreditCardSection from './components/CreditCardSection';

const NEXT_STEP = '/onboarding/sending-domain';

export class OnboardingPlanPage extends Component {
  componentDidMount() {
    this.props.getPlans();
    this.props.getBillingCountries();
  }

  componentDidUpdate(prevProps) {
    const { hasError, history } = this.props;

    // if we can't get plans or countries form is useless
    // they can pick plan later from billing
    if (!prevProps.hasError && hasError) {
      history.push(NEXT_STEP);
    }
  }

  onSubmit = (values) => {
    const { billingCreate, showAlert, history, billing, verifyPromoCode } = this.props;
    const selectedPromo = billing.selectedPromo;
    const newValues = values.card && !values.planpicker.isFree
      ? { ...values, card: prepareCardInfo(values.card) }
      : values;

    // no billing updates needed since they are still on free plan
    if (newValues.planpicker.isFree) {
      history.push(NEXT_STEP);
      return;
    }

    let action = Promise.resolve({});
    if (selectedPromo.promoCode && !values.planpicker.isFree) {
      const { promoCode } = selectedPromo;
      newValues.promoCode = promoCode;
      action = verifyPromoCode({ promoCode, billingId: values.planpicker.billingId, meta: { promoCode }});
    }

    // Note: billingCreate will update the subscription if the account is AWS
    return action
      .then(({ discount_id }) => {
        newValues.discountId = discount_id;
        return billingCreate(newValues);
      })
      .then(() => history.push(NEXT_STEP))
      .then(() => showAlert({ type: 'success', message: 'Added your plan' }));
  };


  applyPromoCode = (promoCode) => {
    const { verifyPromoCode } = this.props;
    verifyPromoCode({ promoCode , billingId: this.props.selectedPlan.billingId, meta: { promoCode }});
  }

  onPlanSelect = (e) => {
    const { currentPlan, clearPromoCode } = this.props;
    if (currentPlan !== e.code) {
      clearPromoCode();
    }
  }
  render() {
    const { loading, plans, submitting, selectedPlan = {}, billing, clearPromoCode } = this.props;
    const { selectedPromo = {}, promoError, promoPending } = billing;
    const promoCodeObj = {
      selectedPromo: selectedPromo,
      promoError: promoError,
      promoPending: promoPending
    };
    const handlePromoCode = {
      applyPromoCode: this.applyPromoCode,
      clearPromoCode: clearPromoCode
    };
    if (loading) {
      return <Loading />;
    }
    const disableSubmit = submitting || promoPending;

    const buttonText = submitting ? 'Updating Subscription...' : 'Get Started';

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <CenteredLogo />
        <Grid>
          <Grid.Column>
            <Panel>
              <PlanPicker selectedPromo={selectedPromo} disabled={disableSubmit} plans={plans} onChange={this.onPlanSelect}/>
              <AccessControl condition={not(isAws)}>
                {!selectedPlan.isFree &&
                <Panel.Section>
                  <PromoCodeNew
                    key={selectedPromo.promoCode || 'promocode'}
                    promoCodeObj ={promoCodeObj}
                    handlePromoCode ={handlePromoCode}
                  />
                </Panel.Section>}
                <CreditCardSection billing={billing} submitting={submitting} selectedPlan={selectedPlan}/>
              </AccessControl>
              <Panel.Section>
                <Button disabled={disableSubmit} primary={true} type='submit' size='large' fullWidth={true}>{buttonText}</Button>
              </Panel.Section>
              <Steps />
            </Panel>
          </Grid.Column>
        </Grid>
      </form>
    );
  }
}

const formOptions = { form: FORMS.JOIN_PLAN, enableReinitialize: true, asyncValidate: promoCodeValidate(FORMS.JOIN_PLAN), asyncChangeFields: ['planpicker'], asyncBlurFields: ['promoCode']};

export default connect(
  choosePlanMSTP(FORMS.JOIN_PLAN),
  { billingCreate, showAlert, getPlans, getBillingCountries, verifyPromoCode, clearPromoCode }
)(reduxForm(formOptions)(OnboardingPlanPage));
