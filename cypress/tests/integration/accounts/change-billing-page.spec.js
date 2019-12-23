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

    cy.server();
    cy.fixture('brightback/deliverability/200.post.json').as('deliverabilityGet');
    cy.route({
      method: 'GET',
      url:
        '/api/v1/deliverability?metrics=count_sent,count_unique_confirmed_opened_approx,count_accepted&precision=day&from=2019-12-16T17:04&to=2019-12-23T17:04&delimiter=,&timezone=America%2FNew_York',
      response: '@deliverabilityGet',
    });

    cy.visit('/account/billing/plan');
  });

  it('on downgrading plan renders section with changes to features', () => {
    cy.get('[data-id=select-plan-free500-0419]').click();

    // cy.contains('include', 'Changes to Features');
  });
});
