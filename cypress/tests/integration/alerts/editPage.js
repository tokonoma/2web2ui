describe('Alerts Page - Edit', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/sending-domains',
      fixture: 'sending-domains/200.get.json',
    });
    cy.stubRequest({
      url: '/api/v1/ip-pools',
      fixture: 'ip-pools/200.get.json',
    });
    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'sending-ips/200.get.json',
    });
    cy.stubRequest({
      url: '/api/v1/subaccounts',
      fixture: 'subaccounts/200.get.json',
    });

    cy.stubRequest({
      url: '/api/v1/alerts/1',
      fixture: 'alerts/single/200.get.json',
    });

    cy.visit('/alerts/edit/1');
  });

  it('Existing alert populates field with correct initial values', () => {
    cy.get('[name="metric"]').should('have.attr', 'disabled');
    cy.findByLabelText('Evaluated').should('have.attr', 'disabled');
    cy.get('[data-id="alert-filters"]').within(() => {
      cy.findByText('Master and all subaccounts').should('be.visible');
      cy.findByLabelText('Facet').should('have.value', 'mailbox_provider');
      cy.findByText('Gmail').should('be.visible');
      cy.findByText('Apple').should('be.visible');
    });
    cy.get('[name="slack"]').should('have.value', 'my slack');
  });

  it('On health score metric, changing filter facet resets the filter values', () => {
    cy.get('[data-id="alert-filters"]').within(() => {
      cy.findByLabelText('Facet').should('have.value', 'mailbox_provider');
      cy.findByText('Gmail').should('be.visible');
      cy.findByText('Apple').should('be.visible');
      cy.findByLabelText('Facet').select('ip_pool');
      cy.findByText('Gmail').should('not.be.visible');
      cy.findByText('Apple').should('not.be.visible');
    });
  });
});
