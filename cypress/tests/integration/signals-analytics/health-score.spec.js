const PAGE_URL = '/signals/health-score';
const API_URL = '/api/v1/signals/health-score/**/*';

describe('The health score page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/subaccounts',
      fixture: 'subaccounts/200.get.json',
    });

    cy.stubRequest({
      url: API_URL,
      fixture: 'signals/health-score/200.get.json',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Health Score | Signals Analytics');
    // Grabbing content within the `<main>` to avoid grabbing the same content from the nav
    cy.get('main').within(() => cy.findByText('Health Score').should('be.visible'));
  });

  it('updates the rendered health score value when changing the date filter', () => {});

  describe('health score value', () => {
    it('renders to the page as a value, rounded to the nearest single digit', () => {
      cy.visit(PAGE_URL);

      cy.get('[data-id="health-score-gauge"]').should('contain', '79.9');
    });

    it('renders a needle that rotates relative to the current health score value', () => {});

    describe('health score value description', () => {
      // Grabbing descriptions by `data-id` here instead of using `.findByText`
      // as the content is broken up with `<strong>` tags in each scenario, making
      // them tough to find. More ideally, these elements could be found an semantically
      // meaningless tags like `<strong>` and `<em>` would be ignored.
      it('renders the description with a value below 55', () => {
        cy.stubRequest({
          url: API_URL,
          fixture: 'signals/health-score/200.get.score-of-54.json',
        });

        cy.visit(PAGE_URL);

        cy.get('[data-id="health-score-below-55-description"]').should('be.visible');
      });

      it('renders the description with the value below 80 and above 55', () => {
        cy.stubRequest({
          url: API_URL,
          fixture: 'signals/health-score/200.get.score-of-55.json',
        });

        cy.visit(PAGE_URL);

        cy.get('[data-id="health-score-below-80-description"]').should('be.visible');
      });

      it('renders the description with a value above 80', () => {
        cy.stubRequest({
          url: API_URL,
          fixture: 'signals/health-score/200.get.score-of-80.json',
        });

        cy.visit(PAGE_URL);

        cy.get('[data-id="health-score-above-80-description"]').should('be.visible');
      });
    });
  });

  describe('health score bar chart', () => {
    it('renders a bar chart that exposes "Health Score", "Injections", and "DoD Change" on hover', () => {});

    it('renders "Total Injections", and health score "High" and "Low" values for the selected date range', () => {});
  });

  describe('health score by subaccount table', () => {
    it('renders by default with "Master & All Subaccounts" and "No Breakdown" selected', () => {});

    it('renders each subaccount along with the current health score for that subaccount', () => {});
  });

  it('renders the empty state when no data is available', () => {});
});
