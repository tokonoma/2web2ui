/// <reference types="Cypress" />

/* eslint-disable no-undef */
describe('Account settings', () => {
  it('is accessible via the user popover in the header', () => {
    // TODO: refactor to use `cy.request()` to log in programmatically instead of via UI interaction
    cy.visit('/');
    cy.get('[name="username"]').type(Cypress.env('USERNAME'));
    cy.get('[name="password"]').type(Cypress.env('PASSWORD'));
    cy.get('button[type="submit"]').click();
    cy.contains('appteam@messagesystems.com').click();
    cy.contains('Account Settings').click();
    cy.url().should('include', 'settings');
    cy.title().should('include', 'Account settings');
  });

  it('Shows a modal when the user clicks "Provision SSO"', () => {
    cy.contains('Provision SSO').click();
    cy.contains('Provision Single Sign-On').should('be.visible');
    cy.get('button').contains('Cancel').click();
  });

  it('Shows a modal when the user clicks "Disable SSO"', () => {
    cy.contains('Disable SSO').click();
    cy.contains('Are you sure you want to disable Single Sign-On?').should('be.visible');
    cy.get('button').contains('Cancel').click();
  });
});
