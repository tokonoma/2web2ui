/// <reference types="Cypress" />

describe('Billing Page', () => {
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

  const selectAFreePlan = () => {
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureAlias: 'subscriptionGet',
    });
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-free500-0419]').click();
  };

  //downgrading, starter  => free plan
  it('on changing plan renders section with changes to features', () => {
    selectAFreePlan();
    cy.findAllByText('Got it')
      .first()
      .click();
    cy.findAllByText('Changes to Features').should('exist');
  });

  //downgrading, starter  => free plan
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

  //downgrading, premier => starter plan
  it('redirects to billing page', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.starter-plan.json',
      fixtureAlias: 'subscriptionGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.premier-plan.json',
      fixtureAlias: 'subscriptionPremierGet',
    });
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-50K-starter-0519]').click();
    cy.findAllByText('Got it')
      .first()
      .click();
    cy.findAllByText('Got it')
      .last()
      .click();
    cy.findAllByText('Change Plan').should('be.visible');
  });

  it('upgrade free account to starter with query parameter', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.test-plan.json',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.test-plan.json',
    });
    cy.visit('/account/billing/plan?code=50K-starter-0519');

    // auto select new plan
    cy.findByText('Your New Plan').should('be.visible');
    cy.findByText('50,000').should('be.visible');

    // todo, should finish upgrade
  });
});
