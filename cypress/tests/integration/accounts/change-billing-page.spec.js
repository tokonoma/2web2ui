/// <reference types="Cypress" />

describe('Billing Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.server();
    cy.fixture('billing/subscription/200.get.json').as('subscriptionGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/billing/subscription',
      response: '@subscriptionGet',
    });

    cy.server();
    cy.fixture('billing/200.get.json').as('billingGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/billing',
      response: '@billingGet',
    });

    cy.server();
    cy.fixture('billing/bundles/200.get.json').as('bundlesGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/billing/bundles',
      response: '@bundlesGet',
    });

    cy.server();
    cy.fixture('billing/plans/200.get.json').as('billingPlansGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/billing/plans',
      response: '@billingPlansGet',
    });

    cy.visit('/account/billing/plan');
  });

  it('on downgrading plan renders section with changes to features', () => {
    cy.server();
    cy.fixture('metrics/deliverability/200.get.json').as('deliverabilityGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/metrics/deliverability**/**',
      response: '@deliverabilityGet',
    });
    cy.server();
    cy.fixture('metrics/precancel/200.post.json').as('precancelPost');
    cy.route({
      method: 'POST',
      url: 'https://app.brightback.com/precancel',
      response: '@precancelPost',
    });
    cy.get('[data-id=select-plan-free500-0419]').click();
    cy.findAllByText('Changes to Features').should('exist');
  });
});
