/// <reference types="Cypress" />

// TODO: This is a temporary location for this test, while https://github.com/SparkPost/2web2ui/pull/1354 is in review
describe('TR-2130', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  it('renders an error on the single validation page when the server returns a 400 error with the message "Usage limit exceeded"', () => {
    cy.server();
    cy.fixture('recipient-validation/single/400.get.usage-limit-exceeded.json').as('RVFixture');
    cy.route({
      method: 'GET',
      status: 400,
      url: '/api/v1/recipient-validation/single/fake-email@gmail.com',
      response: '@RVFixture',
    }).as('getValidation');

    cy.visit('/recipient-validation/single/fake-email@gmail.com');

    cy.wait('@getValidation');

    cy.queryAllByText('View Details')
      .last()
      .click();

    cy.findByText('Contact sales').should('have.attr', 'href', 'https://sparkpost.com/sales');
  });

  it('redirects the user to the list page and shows the validated list in an error state if the batch status returns "usage_limit_exceeded"', () => {});
});
