/// <reference types="Cypress" />

describe('The REST API integration page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.server();
    cy.fixture('api-keys/200.post.json').as('apiKeysPost');
    cy.route({
      method: 'POST',
      url: '/api/v1/api-keys',
      response: '@apiKeysPost',
    });

    cy.visit('/onboarding/email/api');
  });

  it('renders with a relevant title', () => {
    cy.title().should('include', 'REST API | Send a Test Email');
    cy.findByText('REST API Integration').should('be.visible');
  });

  it('renders with a form field with the returned API key', () => {
    cy.findByLabelText('Your API Key').should('have.value', 'this-is-a-fake-api-key');
  });

  it("renders with a CURL example code snippet that includes the logged in user's username", () => {
    cy.get('code').within(() => {
      cy.contains('Authorization: this-is-a-fake-api-key').should('be.visible');
      cy.contains('"recipients": [{ "address": "mockuser@example.com" }]').should('be.visible');
    });
  });

  it('renders with a link to skip to the dashboard', () => {
    cy.findByText('Continue to dashboard').should('have.attr', 'href', '/dashboard');
  });

  it('routes the user to the dashboard with the a modal that contains "Sign Up Complete!"', () => {
    cy.findByText('Continue to dashboard').click();

    cy.url().should('include', '/dashboard');
    cy.findByText('Sign Up Complete!').should('be.visible');

    cy.findByText('Continue to Dashboard').click();
    cy.findByText('Sign Up Complete!').should('not.be.visible');
  });
});
