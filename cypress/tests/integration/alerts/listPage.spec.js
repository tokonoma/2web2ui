const PAGE_URL = '/alerts';
const API_URL = '/api/v1/alerts';

describe('The alerts list page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: API_URL,
      fixture: 'alerts/200.get.json',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Alerts');
    cy.get('main').within(() => cy.findByText('Alerts').should('be.visible'));
  });

  it('renders with a link to the create page', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Create an Alert')
      .closest('a')
      .should('have.attr', 'href', '/alerts/create');
  });

  it('renders an error banner when the server returns one', () => {
    cy.stubRequest({
      statusCode: 400,
      url: API_URL,
      fixture: 'alerts/400.get.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('An error occurred').should('be.visible');
    cy.findByText('Try Again').should('be.visible');
    cy.findByText('Show Error Details').click();
    cy.findByText('This is an error').should('be.visible');
    cy.get('table').should('not.be.visible');
  });

  it('renders the empty state when no results are returned', () => {
    cy.stubRequest({
      url: API_URL,
      fixture: 'alerts/200.get.no-results.json',
    });

    cy.visit(PAGE_URL);

    cy.findAllByText('Create an Alert').should('have.length', 2);
    cy.findByText('Manage notifications that alert you of performance problems.').should(
      'be.visible',
    );
    cy.findAllByText('Create an Alert')
      .last()
      .closest('a')
      .should('have.attr', 'href', '/alerts/create');
    cy.get('table').should('not.be.visible');
  });

  it('renders recent incidents', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Recent Incidents').should('be.visible');

    cy.get('[data-id="recent-incidents"]').within(() => {
      // 'Alert 1' and 'Alert 4' are not rendered since they are muted
      cy.queryByText('Alert 1').should('not.be.visible');
      cy.findByText('Alert 2').should('be.visible');
      cy.findByText('Alert 3').should('be.visible');
      cy.queryByText('Alert 4').should('not.be.visible');
    });
  });

  it('does not render recent incidents when all alerts are muted', () => {
    cy.stubRequest({
      url: API_URL,
      fixture: 'alerts/200.get.all-muted.json',
    });

    cy.visit(PAGE_URL);

    cy.queryByText('Recent Incidents').should('not.be.visible');
    cy.get('[data-id="recent-incidents"]').should('not.be.visible');
  });

  describe('the alerts table', () => {
    it('has alerts in table rows', () => {});

    it('filters based on user entry', () => {});

    it('renders a success banner when muting an alert successfully', () => {});

    it('renders an error banner when muting an alert fails', () => {});

    it('opens a delete confirmation modal when clicking the delete button', () => {});
  });
});
