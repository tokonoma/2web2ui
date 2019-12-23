/// <reference types="Cypress" />

describe('Billing Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.server();
    cy.fixture('account/200.get.json').as('accountGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/account',
      response: '@accountGet',
    });

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
    cy.fixture('account/plans/200.get.json').as('plansGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/account/plans',
      response: '@plansGet',
    });

    cy.server();
    cy.fixture('sending-ips/200.get.json').as('sendingipsGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/sending-ips',
      response: '@sendingipsGet',
    });

    cy.server();
    cy.fixture('account/invoices/200.get.json').as('invoicesGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/account/invoices',
      response: '@invoicesGet',
    });

    cy.server();
    cy.fixture('usage/200.get.json').as('usageGet');
    cy.route({
      method: 'GET',
      url: '/api/v1/usage',
      response: '@usageGet',
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

    cy.visit('/account/billing');
  });

  it('redirects to Change My Plan page when Change Plan button is clicked', () => {
    cy.contains('Change Plan').click();
    cy.title().should('include', 'Change My Plan');
  });
});
