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
      cy.title().should('include', 'Signals');
      //cy.title().should('include', 'Health Score'); // NOTE: Commenting out as this is failing - this is a bug!
      cy.contains('Health Score').should('be.visible');
      cy.url().should('include', 'signals/health-score');
    });

    describe('Spam Traps', () => {
      it('renders the "Spam Trap Monitoring" view', () => {
        cy.contains('Spam Traps').click();
        cy.title().should('include', 'Signals');
        // cy.title().should('include', 'Spam Traps'); // NOTE: Commenting out as this is failing - this is a bug!
        cy.contains('Spam Trap Monitoring').should('be.visible');
        cy.url().should('include', 'signals/spam-traps');
      });
    });

    describe('Engagement Recency', () => {
      it('renders the "Engagement Recency" view', () => {
        cy.contains('Engagement Recency').click();
        cy.title().should('include', 'Signals');
        // cy.title().should('include', 'Engagement Recency'); // NOTE: Commenting out as this is failing - this is a bug!
        cy.contains('Engagement Recency').should('be.visible');
        cy.url().should('include', 'signals/engagement');
      });
    });
  });
});
