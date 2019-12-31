/// <reference types="Cypress" />

function stubRequest({ method = 'GET', statusCode = 200, url, fixture, fixtureName }) {
  cy.server();
  cy.fixture(fixture).as(fixtureName);
  cy.route({
    method,
    url,
    status: statusCode,
    response: `@${fixtureName}`,
  });
}

describe('Billing Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

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
  });

  it('displays a pending plan change banner whenever a plan is downgraded', () => {
    stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.include-pending-subscription.json',
      fixtureName: 'accountPendingDowngradeGet',
    });
    stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.include-pending-downgrades.json',
      fixtureName: 'subscriptionPendingDowngradeGet',
    });
    cy.visit('/account/billing');
    cy.findByText('Pending Plan Change');
  });

  it('redirects to Change My Plan page when Change Plan button is clicked', () => {
    stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.json',
      fixtureName: 'accountGet',
    });
    stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureName: 'subscriptionGet',
    });
    cy.visit('/account/billing');
    cy.contains('Change Plan').click();
    cy.title().should('include', 'Change My Plan');
  });
});
