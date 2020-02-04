const PAGE_BASE_URL = '/signals/health-score/sid';
const PAGE_URL = `${PAGE_BASE_URL}/102`;
const UNIX_STUBBED_DATE = 1580741099000; // Used to set the browser's date to February 2nd, 2020 to remain in step with fixtures

describe('The health score by subaccount page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/signals/cohort-engagement/**/*',
      fixture: 'signals/cohort-engagement/200.get.json',
      requestAlias: 'cohortEngagementRequest',
    });

    cy.stubRequest({
      url: '/api/v1/signals/spam-hits/**/*',
      fixture: 'signals/spam-hits/200.get.json',
      requestAlias: 'spamHitsRequest',
    });

    cy.stubRequest({
      url: '/api/v1/signals/health-score/**/*',
      fixture: 'signals/health-score/200.get.with-subaccounts.json',
      requestAlias: 'healthScoreRequest',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Subaccount | Health Score | Signals Analytics');
    cy.findByText('Subaccount 102').should('be.visible');
  });

  it('renders health score weights when weights are available for the selected date', () => {
    cy.clock(UNIX_STUBBED_DATE);
    cy.visit(PAGE_URL);

    cy.get('[data-id="health-score-components"]').within(() => {
      cy.findByText('Suppression Hits');
      cy.findByText('Subscriber Quality').should('be.visible');
      cy.findByText('Complaints').should('be.visible');
      cy.findByText('Engaged Recipients').should('be.visible');
      cy.findByText('Spam Trap Hits').should('be.visible');
      cy.findByText('Block Bounces').should('be.visible');
      cy.findByText('Unsubscribes').should('be.visible');
      cy.findByText('Unengaged Recipients').should('be.visible');
      cy.findByText('Hard Bounces').should('be.visible');
      cy.findByText('Other Bounces').should('be.visible');
      cy.findByText('Transient Failures').should('be.visible');
      cy.findByText('Historical Engagement').should('be.visible');
    });
  });

  it('renders Recharts chart within the "Health Score", "Spam Trap Monitoring", and "Engagement Recency" panels', () => {
    const rechartsSelector = '.recharts-wrapper';

    cy.clock(UNIX_STUBBED_DATE);
    cy.visit(PAGE_URL);

    // Grabbing a class like this isn't ideal as the test is now tied
    // to Recharts as a library (and the fact that Recharts is supplying this class).
    // Testing visual content is tough without relevant `aria` labels and other features
    // current missing from our current implementation. These tests can be improved!
    cy.get('[data-id="health-score-panel"]').within(() => {
      cy.get(rechartsSelector).should('have.length', 3);
    });

    cy.get('[data-id="spam-traps-panel"]').within(() => {
      cy.get(rechartsSelector).should('be.visible');
    });

    cy.get('[data-id="engagement-recency-panel"]').within(() => {
      cy.get(rechartsSelector).should('be.visible');
    });
  });

  it('renders the two 2 recommendations to the user based on health score history', () => {
    cy.clock(UNIX_STUBBED_DATE);
    cy.visit(PAGE_URL);

    cy.findByText("You're sending to a high rate of problematic email addresses.").should(
      'be.visible',
    );
    cy.findByText('Your email has an unusually high rate of spam complaints.').should('be.visible');
  });

  it('renders no recommendations when all contributing weights are positive', () => {
    cy.clock(UNIX_STUBBED_DATE);
    cy.visit(`${PAGE_BASE_URL}/101`);

    cy.findByText('No actions to display at this time.').should('be.visible');
  });

  describe('empty states', () => {
    beforeEach(() => {
      cy.clock(UNIX_STUBBED_DATE);
    });

    it('does not render a breakdown of the health score composition when no weights are available in the returned health score history', () => {
      cy.stubRequest({
        url: '/api/v1/signals/health-score/**/*',
        fixture: 'signals/health-score/200.get.no-current-weights.json',
      });

      cy.clock(UNIX_STUBBED_DATE);
      cy.visit(PAGE_URL);

      cy.get('[data-id="health-score-components"]').within(() => {
        cy.findByText('Insufficient data to populate this chart').should('be.visible');
      });
    });

    it('renders an empty state for "Health Score" when the server returns no results', () => {
      cy.stubRequest({
        url: '/api/v1/signals/health-score/**/*',
        fixture: 'signals/health-score/200.get.no-results.json',
      });

      cy.visit(PAGE_URL);

      cy.get('[data-id="health-score-panel"]').within(() => {
        cy.findByText('No Data Available').should('be.visible');
        cy.findByText('Insufficient data to populate this chart').should('be.visible');
      });
    });

    it('renders an empty state for "Spam Trap Monitoring" when the server returns no results', () => {
      cy.stubRequest({
        url: '/api/v1/signals/spam-hits/**/*',
        fixture: 'signals/spam-hits/200.get.no-results.json',
      });

      cy.visit(PAGE_URL);

      cy.get('[data-id="spam-traps-panel"]').within(() => {
        cy.findByText('No Data Available').should('be.visible');
        cy.findByText('Insufficient data to populate this chart').should('be.visible');
      });
    });

    it('renders an empty state for "Engagement Recency" when the server returns no results', () => {
      cy.stubRequest({
        url: '/api/v1/signals/cohort-engagement/**/*',
        fixture: 'signals/cohort-engagement/200.get.no-results.json',
      });

      cy.visit(PAGE_URL);

      cy.get('[data-id="engagement-recency-panel"]').within(() => {
        cy.findByText('No Data Available').should('be.visible');
        cy.findByText('Insufficient data to populate this chart').should('be.visible');
      });
    });
  });
});
