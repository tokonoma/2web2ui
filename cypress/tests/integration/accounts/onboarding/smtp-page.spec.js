/// <reference types="Cypress" />

describe('The SMTP integration page', () => {
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

    cy.visit('/onboarding/email/smtp');
  });

  it('renders with a relevant page title', () => {
    cy.title().should('include', 'SMTP Integration | Send a Test Email');
    cy.findByText('SMTP Integration').should('be.visible');
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
