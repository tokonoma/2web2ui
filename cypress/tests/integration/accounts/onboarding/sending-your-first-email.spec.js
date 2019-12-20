/// <reference types="Cypress" />

describe('The sending your first email page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
    cy.visit('/onboarding/email');
  });

  it('renders with a relevant page title', () => {
    cy.title().should('include', 'Sending Your First Email');
    cy.findByText('Sending Your First Email').should('be.visible');
  });

  it('renders with a link to the SMTP onboarding page', () => {
    cy.findByText('SMTP')
      .parent('a')
      .should('have.attr', 'href', '/onboarding/email/smtp');
  });

  it('renders with a link to the REST API page', () => {
    cy.findByText('REST API')
      .parent('a')
      .should('have.attr', 'href', '/onboarding/email/api');
  });

  it('renders with a link to skip to the dashboard', () => {
    cy.findByText('Continue to dashboard').should('have.attr', 'href', '/dashboard');
  });
});
