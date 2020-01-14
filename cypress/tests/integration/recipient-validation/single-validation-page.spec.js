/// <reference types="Cypress" />

const SINGLE_RESULT_URL = '/api/v1/recipient-validation/single/**';

describe('The recipient validation single result page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  it('renders with a relevant page title', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      fixture: 'recipient-validation/single/fake-email/200.get.valid-result.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.title().should('include', 'Results');
  });

  it('renders with the "Valid" status when the result returns as valid', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      fixture: 'recipient-validation/single/fake-email/200.get.valid-result.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.get('[data-id="validation-result-status"]').within(() => {
      cy.findByText('valid').should('be.visible'); // Though rendered as "Valid", the text is transformed to be capitalized using CSS
    });

    cy.findByText(
      'A valid result means that everything checks out for email address and we have no data suggesting that is invalid for any reason.',
    ).should('be.visible');
  });

  it('renders with the "Risky" status when the result returns as risky', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      fixture: 'recipient-validation/single/fake-email/200.get.risky-result.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.get('[data-id="validation-result-status"]').within(() => {
      cy.findByText('risky').should('be.visible'); // Though rendered as "Risky", the text is transformed to be capitalized using CSS
    });
  });

  it('renders with the "Undeliverable" status when the result returns as undeliverable', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      fixture: 'recipient-validation/single/fake-email/200.get.undeliverable-result.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.get('[data-id="validation-result-status"]').within(() => {
      cy.findByText('undeliverable').should('be.visible'); // Though rendered as "undeliverable", the text is transformed to be capitalized using CSS
    });
  });

  it('renders an error and redirects if the request for validation fails', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      statusCode: 400,
      fixture: '/recipient-validation/single/fake-email/400.get.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.findByText('Request failed with status code 400').should('be.visible');
    cy.title().should('eq', 'Recipient Validation | SparkPost');
    cy.findByText('Validate a Single Address').should('be.visible');
  });
});
