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
    cy.get('[data-id=select-plan-free500-0419]').click();
    cy.findAllByText('Changes to Features').should('exist');
  });

  //downgrading, starter  => free plan
  it('Change plan button is displayed only when all the "features have been updated" ', () => {
    cy.get('[data-id=select-plan-free500-0419]').click();
    cy.get('body').then($body => {
      if ($body.text().includes('features have been updated')) {
        cy.get('a[type=button]')
          .contains('Change Plan')
          .should('be.visible');
      } else {
        cy.get('a[type=button]')
          .contains('Change Plan')
          .should('not.be.visible');
      }
    });
  });

  //downgrading, starter  => free plan
  //redirects to brightback page
  it('redirects to brightback page on downgrading to free plan', () => {
    cy.get('[data-id=select-plan-free500-0419]').click();
    cy.get('a[type=button]')
      .contains('Change Plan')
      .click();
    cy.url().should('include', 'brightback ');
  });
});

// const fillBrightBackFormAndRedirect = () => {
//   cy.get('[type="radio"]').check('other_reason');
//   cy.get('[type="text"]')
//     .first()
//     .type('Some reason');
//   cy.get('[id="competition-content"]').click();
//   cy.get('div')
//     .contains('None')
//     .click();
//   cy.get('[type="radio"]').check('1');
//   cy.get('[type="checkbox"]').check();
//   cy.get('button')
//     .contains('Cancel my plan')
//     .click();
//   cy.get('input[name="delete"]').type('CANCEL');
//   cy.get('button')
//     .contains('Cancel my account')
//     .click();
// };

// //downgrading, starter  => free plan
// //after downgrading billing page has a pending plan change banner and Change Plan button is not visible
// it('after downgrading billing page has a pending plan change banner and Change Plan button is not visible', () => {
//   cy.get('[data-id=select-plan-free500-0419]').click();
//   cy.get('a[type=button]')
//     .contains('Change Plan')
//     .click();
//   fillBrightBackFormAndRedirect();
// });
