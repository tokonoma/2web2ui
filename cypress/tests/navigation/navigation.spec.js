/// <reference types="Cypress" />

describe('Mobile Navigation', () => {
  beforeEach(() => {
    cy.viewport(500, 1000);
  });

  const accountDropdownSelector = '[data-id="account-dropdown-button"]';
  const navigationButtonSelector = '[data-id="nav-button-mobilemenu"]';
  const navigationListSelector = '[data-id="navigation-list"]';
  const accountDropdownListSelector = '[data-id="account-dropdown-list"]';

  const clickMenuItem = (menuItemName) => cy.contains(menuItemName).click();
  const openNavigation = () => cy.get(navigationButtonSelector).click();
  const openAccountMenu = () => cy.get(accountDropdownSelector).click();
  const assertNavigationIsVisible = () => cy.get(navigationListSelector).should('be.visible');
  const assertNavigationIsNotVisible = () => cy.get(navigationListSelector).should('not.be.visible');
  const assertAccountMenuIsVisible = () => cy.get(accountDropdownListSelector).should('be.visible');
  const assertAccountMenuIsNotVisible = () => cy.get(accountDropdownListSelector).should('not.be.visible');

  it('opens when clicking on the hamburger icon', () => {
    cy.login();
    openNavigation();
    assertNavigationIsVisible();
  });

  it('stays open after clicking menu item with child', () => {
    clickMenuItem('Signals Analytics');
    assertNavigationIsVisible();
    cy.contains('Bounce').should('be.visible');
  });

  it('closes after clicking child menu item', () => {
    clickMenuItem('Bounce');
    assertNavigationIsNotVisible();
  });

  it('closes after clicking top level menu item with no children', () => {
    openNavigation();
    clickMenuItem('Events');
    assertNavigationIsNotVisible();
  });

  it('closes after opening admin menu', () => {
    openNavigation();
    openAccountMenu();
    assertNavigationIsNotVisible();
    assertAccountMenuIsVisible();
  });

  it('causes admin menu to close after opening', () => {
    openAccountMenu();
    openNavigation();
    assertNavigationIsVisible();
    assertAccountMenuIsNotVisible();
  });
});
