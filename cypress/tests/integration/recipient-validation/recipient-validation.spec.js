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
  });

  it('renders all relevant statuses based on the server response', () => {
    stubRequest({
      method: 'GET',
      fixture: 'recipient-validation/list/200.get.json',
    });

    cy.get('tbody tr')
      .eq(0)
      .should('contain', 'success.csv')
      .should('contain', 'Complete');

    cy.get('tbody tr')
      .eq(1)
      .should('contain', 'reading-upload-file.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(2)
      .should('contain', 'checking-regex.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(3)
      .should('contain', 'performing-mx-lookup.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(4)
      .should('contain', 'performing-decay-scoring.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(5)
      .should('contain', 'performing-role-based-lookup.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(6)
      .should('contain', 'performing-disposable-domain.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(7)
      .should('contain', 'performing-free-email.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(8)
      .should('contain', 'performing-did-you-mean.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(9)
      .should('contain', 'uploading-results-to-s3.csv')
      .should('contain', 'See Progress')
      .should('contain', 'Processing');

    cy.get('tbody tr')
      .eq(10)
      .should('contain', 'error.csv')
      .should('contain', 'Validation Error');
  });

  it('renders pricing information when clicking on the "See Pricing" button', () => {
    cy.findByText('See Pricing').click();

    cy.findByText('How was this calculated?').should('be.visible');
  });
});
