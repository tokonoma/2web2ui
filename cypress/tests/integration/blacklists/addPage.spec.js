describe('Blacklist - Add to Watchlist Page', () => {
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

  it('has a relevant page title', () => {
    cy.title().should('include', 'Add to Watch List | Blacklist');
  });

  it('successfully adds a single resource and redirects to watchlist page', () => {
    cy.findByText('Save').should('be.disabled');
    cy.findByText('Save and Add Another').should('be.disabled');
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

  it('successfully adds multiple resources without redirecting', () => {
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
