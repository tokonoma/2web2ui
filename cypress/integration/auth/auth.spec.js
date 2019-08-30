/// <reference types="Cypress" />

/* eslint-disable no-undef */
describe('The auth view', () => {
  before(() => cy.visit('/'));

  it('Renders the content "Log In"', () => {
    cy.contains('Log In').should('be.visible');
  });

  it('Logs in', () => {
    cy.get('[name="username"]').type(Cypress.env('USERNAME'));
    cy.get('[name="password"]').type(Cypress.env('PASSWORD'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
