/// <reference types="Cypress" />

describe('Billing Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.json',
      fixtureAlias: 'billingGet',
    });

    cy.stubRequest({
      url: '/api/v1/account/plans',
      fixture: 'account/plans/200.get.json',
      fixtureAlias: 'plansGet',
    });

    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'sending-ips/200.get.json',
      fixtureAlias: 'sendingipsGet',
    });

    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'account/invoices/200.get.json',
      fixtureAlias: 'invoicesGet',
    });

    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'usage/200.get.json',
      fixtureAlias: 'usageGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/bundles',
      fixture: 'billing/bundles/200.get.json',
      fixtureAlias: 'bundlesGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/plans',
      fixture: 'billing/plans/200.get.json',
      fixtureAlias: 'billingPlansGet',
    });
  });

  it('displays a pending plan change banner whenever a plan is downgraded', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.include-pending-subscription.json',
      fixtureAlias: 'accountPendingDowngradeGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.include-pending-downgrades.json',
      fixtureAlias: 'subscriptionPendingDowngradeGet',
    });
    cy.visit('/account/billing');
    cy.findByText('Pending Plan Change').should('be.visible');
  });

  it('redirects to Change My Plan page when Change Plan button is clicked', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.json',
      fixtureAlias: 'accountGet',
    });
    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureAlias: 'subscriptionGet',
    });
    cy.visit('/account/billing');
    cy.contains('Change Plan').click();
    cy.title().should('include', 'Change My Plan');
  });
});
