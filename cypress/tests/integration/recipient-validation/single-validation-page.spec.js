/// <reference types="Cypress" />

describe('The recipient validation single result page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
    cy.stubRequest(
      {
        url: '/api/v1/recipient-validation/single/**',
        fixture: 'recipient-validation/single/fake-email/200.get.valid-result.json',
      },
      () => {
        cy.visit('/recipient-validation/single/fake-email@sparkpost.com');
      },
    );
  });

  it('renders with a relevant page title', () => {
    cy.title().should('include', 'Results');
  });
});
