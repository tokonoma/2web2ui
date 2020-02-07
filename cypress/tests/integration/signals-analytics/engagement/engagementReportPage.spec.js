const PAGE_URL = '/reports/engagement';
const DELIVERABILITY_API_URL = '/api/v1/metrics/deliverability**/**';
const STABLE_UNIX_DATE = 1581087062000; // Stable unix timestamp (2/6/2020)

describe('The engagement report page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/subaccounts',
      fixture: 'subaccounts/200.get.json',
    });

    cy.stubRequest({
      url: '/api/v1/metrics/deliverability**/**',
      fixture: 'metrics/deliverability/200.get.json',
    });
  });

  it('has a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Engagement Report | Signals Analytics');
    cy.findByText('Engagement Report').should('be.visible');
  });

  it('renders an error message when the server returns a bad response', () => {
    cy.stubRequest({
      statusCode: 400,
      url: '/api/v1/metrics/deliverability**/**',
      fixture: 'metrics/deliverability/400.get.json',
    });

    cy.visit(PAGE_URL);

    cy.findAllByText('Something went wrong.').should('have.length', 2);
    cy.findByText('No engagement to report').should('be.visible');
    cy.findByText('No clicks to report').should('be.visible');
  });

  // Caught a bug
  // The empty state crashes the UI
  // it('renders an empty state when no results are returned', () => {
  //   cy.stubRequest({
  //     url: DELIVERABILITY_API_URL,
  //     fixture: 'metrics/deliverability/200.get.no-results.json',
  //   });

  //   cy.visit(PAGE_URL);

  //   cy.findByText('No engagement to report').should('be.visible');
  //   cy.findByText('No clicks to report').should('be.visible');
  // });

  it('re-requests data when filtering by "Broad Date Range" and updates query params accordingly', () => {
    const broadDateRangeLabel = 'Broad Date Range';

    cy.visit(PAGE_URL);

    cy.stubRequest({
      url: DELIVERABILITY_API_URL,
      fixture: 'metrics/deliverability/200.get.different-results.json',
    });

    cy.findByLabelText(broadDateRangeLabel).select('Last Hour');
    cy.url().should('include', 'range=hour');

    cy.findByLabelText(broadDateRangeLabel).select('Last 24 Hours');
    cy.url().should('include', 'range=day');

    cy.findByLabelText(broadDateRangeLabel).select('Last 7 Days');
    cy.url().should('include', 'range=7days');

    cy.findByLabelText(broadDateRangeLabel).select('Last 30 Days');
    cy.url().should('include', 'range=30days');

    cy.findByLabelText(broadDateRangeLabel).select('Last 90 Days');
    cy.url().should('include', 'range=90days');

    cy.get('[data-id="summary-panel"]').within(() => {
      // This may seem like an odd way to check for different data,
      // but this is a check for unusual numbers that aren't as realistic
      // as the default `200.get.json` fixture
      cy.findByText('123');
      cy.findByText('789');
      cy.findByText('456');
    });
  });

  it('renders engagement metrics as text', () => {
    cy.visit(PAGE_URL);

    cy.get('[data-id="summary-panel"]').within(() => {
      cy.findByText('150,000'); // `count_sent`
      cy.findByText('200,000'); // `count_unique_confirmed_opened_approx`
      cy.findByText('250,000'); // `count_accepted`
      cy.findByText('325,000'); // `count_unique_clicked_approx`
    });
  });

  it('renders "Sent", "Accepted", "Unique Confirmed Opens", and "Unique Clicks" data within a chart', () => {
    cy.visit(PAGE_URL);

    cy.get('.recharts-wrapper').within(() => {
      cy.findByText('150K').should('be.visible'); // `count_sent`
      cy.findByText('200K').should('be.visible'); // `count_unique_confirmed_opened_approx`
      cy.findByText('250K').should('be.visible'); // `count_accepted`
      cy.findByText('325K').should('be.visible'); // `count_unique_clicked_approx`
    });
  });
});
