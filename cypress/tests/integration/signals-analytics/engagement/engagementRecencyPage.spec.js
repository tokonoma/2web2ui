const PAGE_URL = '/signals/engagement';
const STABLE_UNIX_DATE = 1581087062000; // Stable unix timestamp (2/6/2020)

describe('The engagement recency page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/subaccounts',
      fixture: 'subaccounts/200.get.json',
    });

    cy.stubRequest({
      url: '/api/v1/signals/cohort-engagement/**/*',
      fixture: 'signals/cohort-engagement/200.get.json',
      requestAlias: 'getEngagementData',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Engagement Recency | Signals Analytics');
    cy.get('main').within(() => cy.findByText('Engagement Recency').should('be.visible')); // Avoids grabbing the same content within the nav
  });

  it('renders an empty state when no data is returned', () => {
    cy.stubRequest({
      url: '/api/v1/signals/cohort-engagement/**/*',
      fixture: 'signals/cohort-engagement/200.get.no-results.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('No Data Available').should('be.visible');
  });

  // This is a bug according to Jon.
  // Filed a ticket: https://jira.int.messagesystems.com/browse/SA-1213
  // it('renders an error when the server returns a bad response', () => {
  //   cy.stubRequest({
  //     url: '/api/v1/signals/cohort-engagement/**/*',
  //     fixture: 'signals/cohort-engagement/400.get.json',
  //   });

  //   cy.visit(PAGE_URL);
  // });

  it('re-requests data when filtering by "Broad Date Range"', () => {
    cy.visit(PAGE_URL);

    cy.stubRequest({
      url: '/api/v1/signals/cohort-engagement/**/*',
      fixture: 'signals/cohort-engagement/200.get.no-results.json',
    });

    cy.findByLabelText('Broad Date Range').select('Last 7 Days');

    cy.findByText('No Data Available').should('be.visible');
  });

  it('re-requests data when filtering by "Narrow Date Range"', () => {
    cy.visit(PAGE_URL);

    cy.stubRequest({
      url: '/api/v1/signals/cohort-engagement/**/*',
      fixture: 'signals/cohort-engagement/200.get.no-results.json',
    });

    cy.findByLabelText('Narrow Date Range').click();
    cy.findByText('Apply').click();

    cy.findByText('No Data Available').should('be.visible');
  });

  describe('the engagement recency table', () => {
    beforeEach(() => cy.clock(STABLE_UNIX_DATE));

    it('renders engagements in the table', () => {
      cy.visit(PAGE_URL);

      cy.wait('@getEngagementData');

      // First table row
      cy.findByText('Count').click();

      cy.get('tbody tr')
        .first()
        .within(() => {
          cy.findByText('Master Account').should('be.visible');
          cy.get('.recharts-wrapper').should('be.visible');
          cy.findByText('-50%').should('be.visible');
          cy.findByText('5').should('be.visible');
          cy.findByText('12').should('be.visible');
        });

      cy.findByText('Ratio').click();

      cy.get('tbody tr')
        .first()
        .within(() => {
          // Value is calculated by dividing `"c_14d"` by the `"c_total"` for the latest entry in the data - a little tough to figure out!
          cy.findByText('50%').should('be.visible');
        });

      // Second table row
      cy.findByText('Count').click();

      cy.get('tbody tr')
        .last()
        .within(() => {
          cy.findByText('6257').should('be.visible');
          cy.findByText('No Data').should('be.visible');
          cy.findByText('- - -').should('be.visible');
          cy.findByText('50%').should('be.visible');
          cy.findByText('34').should('be.visible');
        });
    });

    it('updates the table by engagement count vs. engagement ratio when using the "Count" and "Ratio" buttons', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Count').click();
      cy.get('table').within(() => cy.findByText('Current Count').should('be.visible'));

      cy.findByText('Ratio').click();
      cy.get('table').within(() => cy.findByText('Current Ratio').should('be.visible'));
    });

    describe('sorting behavior', () => {
      beforeEach(() => {
        cy.visit(PAGE_URL);

        cy.stubRequest({
          url: '/api/v1/signals/cohort-engagement/**/*',
          fixture: 'signals/cohort-engagement/200.get.no-results.json',
        });
      });

      it('re-requests data when sorting by "Subaccount"', () => {
        cy.get('table').within(() => cy.findByText('Subaccount').click());

        cy.findByText('No Data Available').should('be.visible');
      });

      it('re-requests data when sorting by "Current Ratio"', () => {
        cy.get('table').within(() => cy.findByText('Current Ratio').click());

        cy.findByText('No Data Available').should('be.visible');
      });

      it('re-requests data when sorting by "Current Injections"', () => {
        cy.get('table').within(() => cy.findByText('Current Injections').click());

        cy.findByText('No Data Available').should('be.visible');
      });
    });
  });
});
