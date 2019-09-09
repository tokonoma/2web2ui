/// <reference types="Cypress" />

/* eslint-disable no-undef */
describe('Signals', () => {
  it('displays a list of Signals features when clicked in the navigation', () => {
    cy.login();
    cy.contains('Signals').click();
    cy.contains('Health Score').should('be.visible');
    cy.contains('Spam Traps').should('be.visible');
    cy.contains('Engagement Recency').should('be.visible');
  });

  describe('Health Score', () => {
    it('renders a health score dashboard after navigating to the health score view', () => {
      cy.contains('Health Score').click();
      cy.contains('Health');
      cy.title().should('include', 'Signals');
      cy.contains('Health Score').should('be.visible');
      cy.url().should('include', 'signals/health-score');
    });
  });
});
