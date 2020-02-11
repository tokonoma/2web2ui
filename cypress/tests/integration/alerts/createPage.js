describe('Alerts Page - Create', () => {
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

    cy.visit('/alerts/create');
  });

  it('Monthly Sending Limit metric has limit value and no filters', () => {
    cy.get('[name="metric"]').select('monthly_sending_limit');
    cy.findByText('Percent Used').should('be.visible');
    cy.findByLabelText('Percent Used').should('have.value', '80');
    cy.findByText('Filtered by').should('not.be.visible');
  });

  it('Health Score metric has evaluator, comparison, subaccount filter, & single facet filter', () => {
    cy.get('[name="metric"]').select('health_score');
    cy.findByText('Evaluated').should('be.visible');
    cy.findByText('Comparison').should('be.visible');
    cy.findByLabelText('Score').should('have.value', '80');
    cy.get('[data-id="alert-filters"]').within(() => {
      cy.findByText('Filtered by').should('be.visible');
      cy.findByText('Subaccounts').should('be.visible');
      cy.findByText('Facet').should('be.visible');
      cy.findByLabelText('Facet').select('mailbox_provider').should('have.value', 'mailbox_provider');
    });
  });

  it('Bounce Rate metric has subaccount filter, & multiple filters', () => {
    cy.get('[name="metric"]').select('block_bounce_rate');
    cy.findByLabelText('Bounce Percentage Above').should('have.value', '20');

    cy.get('[data-id="alert-filters"]').within(() => {
      cy.findByText('Filtered by').should('be.visible');
      cy.findByText('Subaccounts').should('be.visible');
      cy.findByText('Sending IP').should('be.visible');
      cy.findByText('Mailbox Provider').should('be.visible');
      cy.findByText('Sending Domain').should('be.visible');
    });
  });

  it('Injection count metric has evaluated value, & no filters', () => {
    cy.get('[name="metric"]').select('injection_count');
    cy.findByLabelText('Falls Below').should('have.value', '100000');
    cy.findByText('Filtered by').should('not.be.visible');
  });

  it('Blacklist metric has filters by blacklist and domains/IP', () => {
    cy.get('[name="metric"]').select('blacklist');

    cy.get('[data-id="alert-filters"]').within(() => {
      cy.findByText('Filtered by').should('be.visible');
      cy.findByText('Blacklists').should('be.visible');
      cy.findByText('Domains or IPs').should('be.visible');
    });
  });

  it('Subaccount Filters stops accepting more subaccounts when master & all or any subaccount is selected', () => {
    cy.get('[name="metric"]').select('block_bounce_rate');

    cy.get('[data-id="alert-filters"]').within(() => {
      cy.findByLabelText('Subaccounts').type('subaccount');
      cy.findByText('Master and all subaccounts').click({ force: true });
      cy.findByLabelText('Subaccounts').should('have.attr', 'readonly')
    });
  });

  it('Subaccount Filters stops accepting master & all or any subaccount when another subaccount is selected', () => {
    cy.get('[name="metric"]').select('block_bounce_rate');

    cy.get('[data-id="alert-filters"]').within(() => {
      cy.findByLabelText('Subaccounts').type('subaccount');
      cy.findByText('Master and all subaccounts').should('be.visible');

      cy.findByText('Fake Subaccount 1 (101)').click({ force: true });
      cy.findByText('Master and all subaccounts').should('not.be.visible');
      cy.findByText('Master account').should('be.visible');
    });
  });
});
