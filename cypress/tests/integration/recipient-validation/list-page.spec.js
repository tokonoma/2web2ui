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
    stubRequest({
      method: 'GET',
      fixture: 'recipient-validation/list/200.get.json',
    });
  });

  it('has a relevant page title', () => {
    cy.visit('/recipient-validation/list');
    cy.title().should('include', 'Recipient Validation');
  });

  it('renders all relevant statuses based on the server response', () => {
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

  it('accepts an uploaded CSV and re-directs the user to a view describing the volume and price of the validation', () => {
    stubRequest({
      method: 'POST',
      url: '/api/v1/recipient-validation/upload',
      fixture: 'recipient-validation/upload/200.post.json',
    });

    stubRequest({
      method: 'GET',
      url: '/api/v1/recipient-validation/job/fake-list',
      fixture: 'recipient-validation/job/fake-list/200.get.json',
    });

    stubRequest({
      method: 'GET',
      url: '/api/v1/usage',
      fixture: 'usage/200.get.json',
    });

    const exampleCSV = 'recipient-validation/example.csv';

    cy.fixture(exampleCSV).then(fileContent => {
      cy.get('[name="csv"]').upload({ fileContent, fileName: 'example.csv', mimeType: 'text/csv' });

      cy.findByText('example.csv').should('be.visible');
      cy.get('[data-id="recipient-list-address-count"]').should('contain', '2');
      cy.findByText('$0.02').should('be.visible');
      cy.findByText('Validate').should('be.visible');
      cy.findByText('No, thanks').should('be.visible');
    });
  });

  describe('the tabbed view that allows the user to choose different means of running validations', () => {
    it('renders the API Integration section when the user clicks on "API Integration"', () => {
      cy.findByText('API Integration').click();
      cy.findByText('Integrate Now').should('be.visible');
      cy.findByText('/api/v1/recipient-validation/single/{address}').should('be.visible');
      cy.findByText('Create API Key').should('have.attr', 'href', '/account/api-keys/create');
      cy.findByText('API Docs').should(
        'have.attr',
        'href',
        'https://developers.sparkpost.com/api/recipient-validation/',
      );
    });

    it('renders the single address validation form when the user clicks on "Single Address"', () => {
      cy.findByText('Single Address').click();
      cy.findByText('Validate a Single Address').should('be.visible');
    });

    it('re-directs the user to the single address validation results page when the user enters a single email address for validation', () => {
      const fakeEmail = 'fake-email@sparkpost.com';

      stubRequest({
        method: 'GET',
        url: `/api/v1/recipient-validation/single/${fakeEmail}`,
        fixture: 'recipient-validation/single/fake-email/200.get.valid-result.json',
      });

      cy.findByText('Single Address').click();
      cy.findByLabelText('Email Address').type(fakeEmail);
      cy.findByText('Validate').click();
    });

    it('renders the list validation form when the user clicks on "List"', () => {
      cy.findByText('Single Address').click(); // Have to click to another tab then back to the current active tab to successfully activate it
      cy.findByText('List').click();
      cy.findByText('Drag and drop your list here').should('be.visible');
    });
  });
});
