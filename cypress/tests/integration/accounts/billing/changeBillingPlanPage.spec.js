describe('Change Billing Plan Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/account/countries?filter=billing',
      fixture: 'account/countries/200.get.billing-filter.json',
    });

    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.json',
      fixtureAlias: 'billingGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/bundles**',
      fixture: 'billing/bundles/200.get.json',
      fixtureAlias: 'bundlesGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/plans',
      fixture: 'billing/plans/200.get.json',
      fixtureAlias: 'billingPlansGet',
    });

    cy.stubRequest({
      url: '/api/v1/metrics/deliverability**/**',
      fixture: 'metrics/deliverability/200.get.json',
      fixtureAlias: 'deliverabilityGet',
    });

    cy.stubRequest({
      method: 'POST',
      url: 'https://app.brightback.com/precancel',
      fixture: 'metrics/precancel/200.post.json',
      fixtureAlias: 'precancelPost',
    });
  });

  const fillOutCreditCardForm = () => {
    cy.findByLabelText('Credit Card Number').type('4000 0000 0000 0000');
    cy.findByLabelText('Cardholder Name').type('Test Account');
    cy.findByLabelText('Expiration Date').type('03/33');
    cy.findByLabelText('Security Code').type('123');
    cy.findByLabelText('Country').select('United States');
    cy.findByLabelText('State').select('Maryland');
    cy.findByLabelText('Zip Code').type('12345');
  };

  const selectAFreePlan = () => {
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureAlias: 'subscriptionGet',
    });
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-free500-0419]').click();
  };

  it('Upgrades free account to starter 50K', () => {
    // user is on the test plan
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });

    // they visit the billing page and change to the starter 50k plan
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-50K-starter-0519]').click();

    cy.findAllByText('Got it').click();
    cy.findByText('Your features have been updated').should('be.visible');

    cy.findByText('Change Plan').click();
    cy.findAllByText('Required').should('have.length', 5);

    // dont' use the fill out function because we are testing form validation in between interactions
    cy.findByLabelText('Credit Card Number').type('4000 0000 0000 0000');
    cy.findAllByText('Required').should('have.length', 4);
    cy.findByLabelText('Cardholder Name').type('Test Account');
    cy.findAllByText('Required').should('have.length', 3);
    cy.findByLabelText('Expiration Date').type('03/33');
    cy.findAllByText('Required').should('have.length', 2);
    cy.findByLabelText('Security Code').type('123');
    cy.findAllByText('Required').should('have.length', 1);
    cy.findByLabelText('Country').select('United States');
    cy.findByLabelText('State').select('Maryland');
    cy.findByLabelText('Zip Code').type('12345');
    cy.queryAllByText('Required').should('not.be.visible');

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.json',
    });

    cy.findByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('50,000 emails for $20 per month').should('be.visible');
    cy.url().should('equal', `${Cypress.config().baseUrl}/account/billing`);
  });

  it('Upgrades free account to starter 100K', () => {
    // user is on the test plan
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });

    cy.visit('/account/billing/plan');

    cy.findAllByText('100,000').should('be.visible');
    cy.findAllByText('emails/month').should('be.visible');
    cy.findAllByText('$20').should('be.visible');

    cy.get('[data-id=select-plan-100K-starter-0519]').click();

    cy.findAllByText('Got it').click();

    fillOutCreditCardForm();

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.100k-starter-plan.json',
    });

    cy.findByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('100,000 emails for $30 per month').should('be.visible');
    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('Upgrades free account to starter 50K with query parameter', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });

    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });
    cy.visit('/account/billing/plan?code=50K-starter-0519');

    // auto select new plan
    cy.findByText('Your New Plan').should('be.visible');
    cy.findByText('50,000').should('be.visible');

    cy.findByText('Got it').click();
    cy.findByText('Your features have been updated').should('be.visible');

    fillOutCreditCardForm();

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.json',
    });

    cy.findAllByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('50,000 emails for $20 per month').should('be.visible');
    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('Upgrades free account to starter 100K with query parameter', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });

    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });
    cy.visit('/account/billing/plan?code=100K-starter-0519');

    cy.findByText('Your New Plan').should('be.visible');
    cy.findByText('100,000').should('be.visible');

    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.100k-premier-plan.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });
    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.100k-starter-plan.json',
    });

    cy.findAllByText('Got it').click();
    cy.findByText('Your features have been updated').should('be.visible');

    fillOutCreditCardForm();

    cy.findByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('100,000 emails for $30 per month').should('be.visible');
    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('Upgrades free account to premier 100K', () => {
    // user is on the test plan
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });

    cy.visit('/account/billing/plan');

    cy.findAllByText('100,000').should('be.visible');
    cy.findAllByText('emails/month').should('be.visible');
    cy.findAllByText('$75').should('be.visible');
    cy.get('[data-id=select-plan-100K-premier-0519]').click();
    cy.findByText('Your features have been updated').should('be.visible');

    fillOutCreditCardForm();

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.100k-premier-plan.json',
    });

    cy.findByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('100,000 emails for $75 per month').should('be.visible');
    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('Upgrades free account to premier 250K', () => {
    // user is on the test plan
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });

    cy.visit('/account/billing/plan');

    cy.findAllByText('250,000').should('be.visible');
    cy.findAllByText('emails/month').should('be.visible');
    cy.findAllByText('$170').should('be.visible');

    cy.get('[data-id=select-plan-250K-premier-0519]').click();
    cy.findByText('Your features have been updated').should('be.visible');
    fillOutCreditCardForm();

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.250k-premier-plan.json',
    });

    cy.findByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('250,000 emails for $170 per month').should('be.visible');
    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('Upgrades free account to premier 500K', () => {
    // user is on the test plan
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });

    cy.visit('/account/billing/plan');

    cy.findAllByText('500,000').should('be.visible');
    cy.findAllByText('emails/month').should('be.visible');
    cy.findAllByText('$290').should('be.visible');

    cy.get('[data-id=select-plan-500K-premier-0519]').click();

    cy.findByText('Your features have been updated').should('be.visible');

    fillOutCreditCardForm();

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.500k-premier-plan.json',
    });

    cy.findByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('500,000 emails for $290 per month').should('be.visible');
    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('Upgrades free account to premier 1M', () => {
    // user is on the test plan
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });

    cy.visit('/account/billing/plan');

    cy.get('[data-id=select-plan-1M-premier-0519]').click();
    cy.findByText('Your features have been updated').should('be.visible');

    fillOutCreditCardForm();

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    // Then server returns the new plan info that was saved...
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.1m-premier-plan.json',
    });

    cy.findByText('Change Plan').click();
    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });
    cy.findByText('Plan Overview').should('be.visible');
    cy.findByText('Your Plan').should('be.visible');
    cy.findByText('1,000,000 emails for $525 per month').should('be.visible');
    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('on changing plan renders section with changes to features', () => {
    selectAFreePlan();
    cy.findAllByText('Got it')
      .first()
      .click();
    cy.findAllByText('Changes to Features').should('exist');
  });

  it('Change plan button is displayed only when all the "features have been updated" ', () => {
    selectAFreePlan();
    cy.get('body').then($body => {
      if ($body.text().includes('features have been updated')) {
        cy.get('a[type=button]')
          .contains('Change Plan')
          .should('be.visible');
      }
      cy.findAllByText('Change Plan').should('not.be.visible');
    });
  });

  it('shows the compare features modal', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });
    cy.visit('/account/billing/plan');

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });

    cy.findAllByText('Compare Features').click();

    cy.findAllByText('Test Account').should('be.visible');
    cy.findAllByText('Starter Plans').should('be.visible');
    cy.findAllByText('Premier Plans').should('be.visible');

    cy.findAllByText('Standard Features').should('be.visible');
    cy.findAllByText('Advanced Settings').should('be.visible');

    cy.findAllByText('Content and Recipients')
      .scrollIntoView()
      .should('be.visible');
    cy.findAllByText('Account Management and Support')
      .scrollIntoView()
      .should('be.visible');

    cy.findAllByText('Close').click();

    cy.queryAllByText('Starter Plans').should('not.be.visible');
    cy.queryAllByText('Premier Plans').should('not.be.visible');
    cy.queryAllByText('Close').should('not.be.visible');
  });

  it('Upgrades from free to paid using a promo code', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });

    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/subscription/promo-codes/*',
      fixture: 'account/billing/200.get.promo-code.json',
      fixtureAlias: 'promoGet',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/promo-codes/*',
      fixture: 'blank.json',
      fixtureAlias: 'promoGet',
    });
    cy.visit('/account/billing/plan');

    cy.get('[data-id=select-plan-100K-premier-0519]').click();

    cy.findByLabelText('Promo Code').type('THXFISH2');
    cy.findByText('Apply').click();
    cy.findByText('Remove').click();
    cy.findByLabelText('Promo Code').type('THXFISH2');
    cy.findByText('Apply').click();

    fillOutCreditCardForm();

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/cors-data?context=create-account',
      fixture: 'billing/cors-data/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/v1/accounts',
      fixture: 'zuora/accounts/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/account/subscription/check',
      fixture: 'account/subscription/check/200.post.json',
    });
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/billing/subscription/check',
      fixture: 'billing/subscription/check/200.post.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'blank.json',
    });
    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'blank.json',
    });

    cy.findAllByText('Change Plan').click();

    cy.withinSnackbar(() => {
      cy.findByText('Subscription Updated').should('be.visible');
    });

    cy.url().should('equal', Cypress.config().baseUrl + '/account/billing');
  });

  it('Retains credit card information between plan changes', () => {
    // user is on the test plan
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.has-no-credit-card.json',
      fixtureAlias: 'billingGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });

    // they visit the billing page and change to the starter 50k plan
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-50K-starter-0519]').click();

    cy.findAllByText('Got it').click();
    cy.findByText('Your features have been updated').should('be.visible');

    fillOutCreditCardForm();

    cy.findByText('Change').click();
    cy.get('[data-id=select-plan-100K-starter-0519]').click();

    cy.findAllByText('Got it').click();

    cy.findByLabelText('Credit Card Number').should('have.value', '4000 0000 0000 0000');
    cy.findByLabelText('Cardholder Name').should('have.value', 'Test Account');
    cy.findByLabelText('Expiration Date').should('have.value', '03 / 33');
    cy.findByLabelText('Security Code').should('have.value', '123');
    cy.findByLabelText('Country').should('have.value', 'US');
    cy.findByLabelText('State').should('have.value', 'MD');
    cy.findByLabelText('Zip Code').should('have.value', '12345');
  });
});
