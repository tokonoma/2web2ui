import MockRecaptcha from 'src/__testHelpers__/mockRecaptcha';
import mountRoute from 'src/__testHelpers__/mountRoute';
import getFormFiller from 'src/__testHelpers__/fill';
import config from 'src/config';

jest.mock('react-recaptcha', () => MockRecaptcha);

export const freePlanPredicate = (plan) => /free/.test(plan.code);

class SignupFlow {
  constructor() {
    config.featureFlags.has_signup = true;
  }

  async _mount() {
    this.page = await mountRoute('/join', { authenticated: false });
    this.formFiller = getFormFiller(this.page.wrapper);
    for (const prop in this.page) {
      this[prop] = this.page[prop];
    }
  }

  async signup({ optIn = false } = {}) {
    this.formFiller([
      { name: 'first_name', value: 'Firsty' },
      { name: 'last_name', value: 'Ferret' },
      { name: 'email', value: 'test-username@example.com' },
      { name: 'password', value: 'test-password' },
      { name: 'tou_accepted', value: true, type: 'checkbox' },
      { name: 'email_opt_in', value: optIn, type: 'checkbox' }
    ]);
    await this.page.simulate('button', 'click');
  }

  async choosePlan({ planFilter = freePlanPredicate, submit = true } = {}) {
    // :( The plan picker uses references to an item in `state.billing.plans` as its value.
    const plan = this.page.store.getState().billing.plans.find(planFilter);
    this.formFiller({ name: 'planpicker', value: plan, type: 'downshift' });

    if (submit) {
      await this.page.simulate('form', 'submit');
    }
  }

  async fillBillingForm() {
    this.formFiller([
      { name: 'card.number', value: '4111111111111111' },
      { name: 'card.name', value: 'Person Face' },
      { name: 'card.expCombined', value: '10 / 2022' },
      { name: 'card.securityCode', value: 123 },

      { type: 'select', name: 'billingAddress.country', value: 'US' },
      { type: 'select', name: 'billingAddress.state', value: 'MD' },
      { name: 'billingAddress.zip', value: '12345' }
    ]);
  }

  async fillSendingDomainForm() {
    this.formFiller({ name: 'domain', value: 'test.example.com' });
    await this.page.simulate('form', 'submit');
  }
}

export default async () => {
  const flow = new SignupFlow();
  await flow._mount();
  return flow;
};
