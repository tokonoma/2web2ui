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
  });

  //downgrading, starter  => free plan
  it('on changing plan renders section with changes to features', () => {
    stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureName: 'subscriptionGet',
    });
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-free500-0419]').click();
    cy.findAllByText('Changes to Features').should('exist');
  });

  //downgrading, starter  => free plan
  it('Change plan button is displayed only when all the "features have been updated" ', () => {
    stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureName: 'subscriptionGet',
    });
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-free500-0419]').click();
    cy.get('body').then($body => {
      if ($body.text().includes('features have been updated')) {
        cy.get('a[type=button]')
          .contains('Change Plan')
          .should('be.visible');
      }
    });
  });

  //downgrading, starter  => free plan
  //redirects to brightback page
  it('redirects to brightback page on downgrading to free plan', () => {
    stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureName: 'subscriptionGet',
    });
    cy.visit('/account/billing/plan');
    cy.get('[data-id=select-plan-free500-0419]').click();
    cy.get('body').then($body => {
      if ($body.text().includes('Got it')) {
        cy.get('button')
          .contains('Got it')
          .first()
          .click();
      }
    });
    cy.get('a[type=button]')
      .contains('Change Plan')
      .click();
    cy.url().should('include', 'brightback');
  });

  //downgrading, premier => starter plan
  it('redirects to billing page', () => {
    stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.premier-plan.json',
      fixtureName: 'subscriptionPremierGet',
    });
    cy.visit('/account/billing/plan');
  });
});
