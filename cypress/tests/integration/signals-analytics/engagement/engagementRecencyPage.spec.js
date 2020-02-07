const PAGE_URL = '/signals/engagement';

describe('The engagement recency page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/signals/cohort-engagement/**/*',
      fixture: 'signals/cohort-engagement/200.get.json',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Engagement Recency | Signals Analytics');
    cy.get('main').within(() => cy.findByText('Engagement Recency').should('be.visible')); // Avoids grabbing the same content within the nav
  });

  it('renders an empty state when no data is returned', () => {});

  it('renders an error when the server returns a bad response', () => {});

  it('re-requests data when filtering by "Broad Date Range"', () => {});

  it('re-requests data when filtering by "Narrow Date Range"', () => {});

  describe('the engagement recency table', () => {
    it('updates the table by engagement count vs. engagement ratio when using the "Count" and "Ratio" buttons', () => {});

    it('renders engagements in the table', () => {});

    it('allows alphabetical sorting by "IP Pool", "Current Count", "Current Ratio", "WoW" and "Current Injections"', () => {});
  });
});
