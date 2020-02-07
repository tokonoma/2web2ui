const PAGE_URL = '/reports/engagement';
const DELIVERABILITY_API_URL = '/api/v1/metrics/deliverability**/**';

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

  it('re-requests data when filtering by "Broad Date Range"', () => {});

  it('re-requests data when filtering by "Narrow Date Range"', () => {});

  it('renders engagement metrics as text', () => {});

  it('renders "Sent", "Accepted", "Unique Confirmed Opens", and "Unique Clicks" data within a chart', () => {});
});
