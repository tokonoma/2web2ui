/// <reference types="Cypress" />

function stubRequest({
  method,
  statusCode = 200,
  url = '/api/v1/recipient-validation/list',
  fixture,
}) {
  cy.server();
  cy.fixture(fixture).as('recipientValidationReq');
  cy.route({
    method,
    url,
    status: statusCode,
    response: '@recipientValidationReq',
  });
  cy.visit('/recipient-validation/list');
}

describe('The recipient validation page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  it('has a relevant page title', () => {
    cy.visit('/recipient-validation/list');
    cy.title().should('include', 'Recipient Validation');
    cy.findByText('Recipient Validation').should('be.visible');
  });

  it('renders all relevant statuses based on the server response', () => {
    stubRequest({
      method: 'GET',
      fixture: 'recipient-validation/list/200.get.json',
    });
  });
});
