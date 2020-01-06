/// <reference types="Cypress" />

describe('The recipient validation single result page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');
  });

  it('renders with a relevant page title', () => {});
});
