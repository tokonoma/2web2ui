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
      'Our data indicates we have seen deliveries and/or active engagement associated with this email address. We have no data suggesting that this is an invalid email address for any reason.',
    ).should('be.visible');
  });

  it('renders with the "Neutral" status when the result returns as neutral', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      fixture: 'recipient-validation/single/fake-email/200.get.neutral-result.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.get('[data-id="validation-result-status"]').within(() => {
      cy.findByText('neutral').should('be.visible'); // Though rendered as "Neutral", the text is transformed to be capitalized using CSS
    });

    cy.findByText(
      'Our data indicates we have not seen any bounces associated with this email address that would suggest it to be invalid or undeliverable to. However, we have not seen any specific delivery and/or engagement events associated as well.',
    ).should('be.visible');
  });

  it('renders with the "Typo" status when the result returns as typo', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      fixture: 'recipient-validation/single/fake-email/200.get.typo-result.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.get('[data-id="validation-result-status"]').within(() => {
      cy.findByText('typo').should('be.visible'); // Though rendered as "Typo", the text is transformed to be capitalized using CSS
    });

    cy.findByText(
      'Our data indicates there is likely a typo in the domain for this email address. Check “did you mean” for our best recommendation to fix the misspelled domain.',
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

    cy.findByText(
      'A risky result means that our data analysis indicated that the email address has bounced at least once in the past, but has not seen a subsequent bounce in quite some time. Data suggests this email address can in fact be delivered to, however there is some potential risk of the email address bouncing.',
    ).should('be.visible');
  });

  it('renders with the "Undeliverable" status when the result returns as undeliverable', () => {
    cy.stubRequest({
      url: SINGLE_RESULT_URL,
      fixture: 'recipient-validation/single/fake-email/200.get.undeliverable-result.json',
    });

    cy.visit('/recipient-validation/single/fake-email@sparkpost.com');

    cy.get('[data-id="validation-result-status"]').within(() => {
      cy.findByText('undeliverable').should('be.visible'); // Though rendered as "Undeliverable", the text is transformed to be capitalized using CSS
    });

    cy.findByText('Our data strongly indicates this email address cannot be delivered to.').should(
      'be.visible',
    );
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
