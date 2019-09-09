/// <reference types="Cypress" />

/* eslint-disable no-undef */
describe('The auth view', () => {
  before(() => cy.visit('/'));

  it('Renders the content "Log In"', () => {
    cy.contains('Log In').should('be.visible');
  });

  it('Logs in', () => {
    cy.login();
    cy.contains('An unknown error occurred').should('not.be.visible');
    cy.url().should('include', '/dashboard');
  });
});
