/// <reference types="Cypress" />

function stubRequest({ method, statusCode = 200, url = '/api/v1/templates', fixture }) {
  cy.server();
  cy.fixture(fixture).as('templateReq');
  cy.route({
    method,
    url,
    status: statusCode,
    response: '@templateReq',
  });
  cy.visit('/templates');
}

describe('The templates list page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  it('has a relevant page title', () => {
    cy.visit('/templates');
    cy.title().should('include', 'Templates');
  });

  it('renders an empty state when no templates are returned with a "Create New" button', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.no-results.json',
    });

    cy.findByText('Manage your email templates').should('be.visible');
    cy.findByText('Create New').click();
    cy.url().should('include', '/create');
    cy.title().should('include', 'Create New Template');
  });

  it('it does not render the "Recent Activity" section when fewer than three template results are returned', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.2-results.json',
    });

    cy.findByText('Stubbed Template 1').should('be.visible');
    cy.findByText('Stubbed Template 2').should('be.visible');
    cy.findByText('Recent Activity').should('not.be.visible');
  });

  it('renders "Recent Activity" when three or more template results are returned', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.3-results.json',
    });

    cy.findByText('Recent Activity').should('be.visible');
    cy.findAllByText('Stubbed Template 1')
      .should('be.visible')
      .its('length')
      .should('be', 2);
    cy.findAllByText('Stubbed Template 2').should('be.visible');
    cy.findAllByText('Stubbed Template 3').should('be.visible');
  });

  it('renders "Recent Activity" results with a duplicate action', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.3-results.json',
    });

    stubRequest({
      method: 'GET',
      url: '/api/v1/templates/stubbed-template-1',
      fixture: 'templates/stubbed-template-1/200.get.json',
    });

    cy.get('[data-id="recent-activity-button-duplicate"]')
      .first()
      .click();

    cy.findByLabelText('Template Name *').should('have.value', 'Stubbed Template 1 (COPY)');
    cy.findByLabelText('Template ID *').should('have.value', 'stubbed-template-1-copy');
  });

  it('renders "Recent Activity" results with a delete action', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.3-results.json',
    });

    cy.get('[data-id="recent-activity-button-delete"]')
      .first()
      .click();

    cy.findByText('Are you sure you want to delete your template?').should('be.visible');
  });

  it('has a table that sorts by "Template Name" alphabetically"', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.alphabetical-results.json',
    });

    // Sorts by ascending
    cy.findByText('Template Name').click();

    cy.get('tbody tr')
      .eq(0)
      .should('contain', 'A');

    cy.get('tbody tr')
      .eq(1)
      .should('contain', 'B');

    cy.get('tbody tr')
      .eq(2)
      .should('contain', 'C');

    // Sorts by descending
    cy.findByText('Template Name').click();

    cy.get('tbody tr')
      .eq(0)
      .should('contain', 'C');

    cy.get('tbody tr')
      .eq(1)
      .should('contain', 'B');

    cy.get('tbody tr')
      .eq(2)
      .should('contain', 'A');
  });

  it('has a table that sorts by "Status" alphabetically', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.published-and-draft-results.json',
    });

    cy.findByText('Status').click();

    cy.get('tbody tr')
      .eq(0)
      .should('contain', 'Draft');

    cy.get('tbody tr')
      .eq(1)
      .should('contain', 'Draft');

    cy.get('tbody tr')
      .eq(2)
      .should('contain', 'Published');

    cy.get('tbody tr')
      .eq(3)
      .should('contain', 'Published');

    cy.findByText('Status').click();

    cy.get('tbody tr')
      .eq(0)
      .should('contain', 'Published');

    cy.get('tbody tr')
      .eq(1)
      .should('contain', 'Published');

    cy.get('tbody tr')
      .eq(2)
      .should('contain', 'Draft');

    cy.get('tbody tr')
      .eq(3)
      .should('contain', 'Draft');
  });

  it('has a table "Last Updated" in ascending and descending order by date', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.time-ordered-results.json',
    });

    cy.findByText('Last Updated').click();

    cy.get('tbody tr')
      .eq(0)
      .should('contain', 'August 11th');

    cy.get('tbody tr')
      .eq(1)
      .should('contain', 'August 12th');

    cy.get('tbody tr')
      .eq(2)
      .should('contain', 'August 13th');

    cy.findByText('Last Updated').click();

    cy.get('tbody tr')
      .eq(0)
      .should('contain', 'August 13th');

    cy.get('tbody tr')
      .eq(1)
      .should('contain', 'August 12th');

    cy.get('tbody tr')
      .eq(2)
      .should('contain', 'August 11th');
  });

  it('has table rows with a duplicate action that duplicates a template', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.3-results.json',
    });

    stubRequest({
      method: 'GET',
      url: '/api/v1/templates/stubbed-template-1',
      fixture: 'templates/stubbed-template-1/200.get.json',
    });

    stubRequest({
      method: 'POST',
      url: '/api/v1/templates',
      fixture: 'templates/200.post.create.json',
    });

    cy.get('[data-id="table-button-duplicate"]')
      .first()
      .click();

    cy.findByLabelText('Template Name *').should('have.value', 'Stubbed Template 1 (COPY)');
    cy.findByLabelText('Template ID *').should('have.value', 'stubbed-template-1-copy');

    cy.findByText('Duplicate').click();

    cy.findByText('Template Stubbed Template 1 duplicated').should('be.visible');
  });

  it('has table rows with a delete action that deletes a template', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.3-results.json',
    });

    stubRequest({
      method: 'DELETE',
      url: '/api/v1/templates/stubbed-template-1',
      fixture: 'templates/stubbed-template-1/200.delete.json',
    });

    cy.get('[data-id="table-button-delete"]')
      .first()
      .click();

    cy.findByText('Are you sure you want to delete your template?').should('be.visible');

    cy.findByText('Delete All Versions').click();

    cy.findByText('Template Stubbed Template 1 deleted').should('be.visible');
  });

  it('filters results by name', () => {
    stubRequest({
      method: 'GET',
      fixture: 'templates/200.get.3-results.json',
    });

    cy.findByLabelText('Filter By')
      .clear()
      .type('Stubbed Template 1');

    cy.get('table').within(() => {
      cy.findByText('Stubbed Template 2').should('not.be.visible');
      cy.findByText('Stubbed Template 3').should('not.be.visible');
    });

    cy.findByLabelText('Filter By')
      .clear()
      .type('Stubbed Template 2');

    cy.get('table').within(() => {
      cy.findByText('Stubbed Template 1').should('not.be.visible');
      cy.findByText('Stubbed Template 3').should('not.be.visible');
    });

    cy.findByLabelText('Filter By')
      .clear()
      .type('Stubbed Template 3');

    cy.get('table').within(() => {
      cy.findByText('Stubbed Template 1').should('not.be.visible');
      cy.findByText('Stubbed Template 2').should('not.be.visible');
    });

    cy.findByLabelText('Filter By')
      .clear()
      .type('Nothing will be found');

    cy.get('table').within(() => {
      cy.findByText('Stubbed Template 1').should('not.be.visible');
      cy.findByText('Stubbed Template 2').should('not.be.visible');
      cy.findByText('Stubbed Template 3').should('not.be.visible');
    });
  });

  it('has a "Create New" button that navigates to the template creation page', () => {
    cy.findByText('Create New').click();

    cy.title().should('include', 'Create New Template');
    cy.findByText('Create New Template').should('be.visible');
  });
});
