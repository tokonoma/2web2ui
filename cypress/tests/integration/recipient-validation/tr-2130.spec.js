/// <reference types="Cypress" />

// TODO: This is a temporary location for this test, while https://github.com/SparkPost/2web2ui/pull/1354 is in review
describe('TR-2130', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  it('renders an error on the single validation page when the server returns a 400 error with the message "Validation limit exceeded"', () => {
    cy.server();
    cy.fixture('recipient-validation/single/400.get.usage-limit-exceeded.json').as('RVFixture');
    cy.route({
      method: 'GET',
      status: 420,
      url: '/api/v1/recipient-validation/single/fake-email@gmail.com',
      response: '@RVFixture',
    }).as('getValidation');

    cy.visit('/recipient-validation/single/fake-email@gmail.com');

    cy.wait('@getValidation');

    cy.findByText('Validation limit exceeded');

    cy.findAllByText('View Details')
      .last()
      .click();

    cy.findByText('Submit a ticket')
      .should('have.attr', 'href', '/dashboard?supportTicket=true&supportIssue=general_issue')
      .click();

    cy.findByText('I need help with...').should('be.visible');
  });

  it('it renders a "Validation Error" and an alert with "Validation Limit Exceeded" if the batch status on the list page is "usage_limit_exceeded"', () => {
    cy.server();
    cy.fixture('recipient-validation/list/400.get.usage-limit-exceeded.json').as('RVFixture');
    cy.route({
      url: '/api/v1/recipient-validation/job/fake-list',
      response: '@RVFixture',
    }).as('getValidation');

    cy.visit('/recipient-validation/list/fake-list');

    cy.wait('@getValidation');

    cy.queryByText('Validation Error').should('be.visible');

    cy.wait(5000); // Wait for the polling interval as defined on the list progress component

    cy.findByText('Validation limit exceeded').should('be.visible');

    cy.findByText('View Details')
      .last()
      .click();

    cy.findByText('Submit a ticket')
      .should('have.attr', 'href', '/dashboard?supportTicket=true&supportIssue=general_issue')
      .click();

    cy.findByText('I need help with...').should('be.visible');
  });
});
