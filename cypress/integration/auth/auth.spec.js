/// <reference types="Cypress" />

/* eslint-disable no-undef */
describe('The auth view', () => {
  before(() => cy.visit('/'));

  it('Renders the content "Log In"', () => {
    cy.contains('Log In').should('be.visible');
  });
});
