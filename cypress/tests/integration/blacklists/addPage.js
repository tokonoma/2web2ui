describe('Alerts Page - Create', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/blacklist-monitors',
      fixture: 'blacklists/200.post.json',
      requestAlias: 'addNewResource',
    });

    cy.visit('/blacklist/watchlist/add');
  });

  it('Adding a single resource to monitor', () => {
    cy.findByLabelText('IP or Sending Domain').type('sparkpost.io');
    cy.findByText('Save').click();
    cy.wait('@addNewResource').then(({ requestBody }) => {
      expect(requestBody).to.deep.equal({
        resource: 'sparkpost.io',
      });
    });
    cy.url().should('include', '/blacklist/watchlist');
    cy.url().should('not.include', '/add');
    cy.findByText('Added sparkpost.io to Watchlist').should('be.visible');
  });

  it('Adding multiple resources to monitor', () => {
    cy.findByLabelText('IP or Sending Domain').type('sparkpost.io');
    cy.findByText('Save and Add Another').click();
    cy.wait('@addNewResource').then(({ requestBody }) => {
      expect(requestBody).to.deep.equal({
        resource: 'sparkpost.io',
      });
    });
    cy.url().should('include', '/blacklist/watchlist/add');
    cy.findByText('Added sparkpost.io to Watchlist').should('be.visible');

    cy.findByLabelText('IP or Sending Domain').type('123.123');
    cy.findByText('Save and Add Another').click();
    cy.wait('@addNewResource').then(({ requestBody }) => {
      expect(requestBody).to.deep.equal({
        resource: '123.123',
      });
    });
  });
});
