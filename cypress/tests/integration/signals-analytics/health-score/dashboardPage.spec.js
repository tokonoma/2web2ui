const PAGE_URL = '/signals/health-score';
const API_URL = '/api/v1/signals/health-score/**/*';

describe('The health score dashboard page', () => {
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

  // Found a bug! A 400 response causes the ErrorBoundary to render
  // it('handles errors', () => {
  //   cy.stubRequest({
  //     url: API_URL,
  //     fixture: 'signals/health-score/400.get.json',
  //   });

  //   cy.visit(PAGE_URL);
  // });

  // NOTE: Waiting on `<label>s` made available in the `TR-2133` branch:
  // https://github.com/SparkPost/2web2ui/pull/1388
  // it('updates the rendered health score value when changing the date filter', () => {});
  //
  // it('re-renders the chart heading based on the date selection', () => {})

  it('renders the empty state when insufficient data is returned', () => {
    cy.stubRequest({
      url: API_URL,
      fixture: 'signals/health-score/200.get.no-results.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('Current Health Score Not Available').should('be.visible');
    cy.findByText('Health Scores Not Available').should('be.visible');
    cy.findByText('No Data Available').should('be.visible');
  });

  it('renders the WoW change as a percentage', () => {
    cy.visit(PAGE_URL);

    cy.get('[data-id="health-score-wow-change"]').within(() => {
      cy.findByText('11%').should('be.visible');
    });
  });

  // How is DoD calculated? Not coming directly from the server, sadly
  // it('renders the DoD change as a percentage', () => {
  //   cy.visit(PAGE_URL);

  //   cy.get('[data-id="health-score-dod-change"]').within(() => {
  //   });
  // });

  describe('health score value', () => {
    it('renders to the page as a value, rounded to the nearest single digit', () => {
      cy.visit(PAGE_URL);

      cy.get('[data-id="health-score-gauge"]').should('contain', '79.9');
    });

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

    it('renders "Total Injections"', () => {
      cy.stubRequest({
        url: API_URL,
        // This fixture is designed to clearly see the relationship between the historical scores and the "Total Injections" value
        fixture: 'signals/health-score/200.get.total-injections.json',
      });

      cy.visit(PAGE_URL);

      // "Total Injections" is derived from the injections for each historical health score
      cy.get('[data-id="health-score-total-injections"]').within(() => {
        cy.findByText('2.5M').should('be.visible');
      });
    });

    it('renders the "High" health score value and the "Low" health score value based on historical data', () => {
      cy.stubRequest({
        url: API_URL,
        fixture: 'signals/health-score/200.get.high-value-low-value.json',
      });

      cy.visit(PAGE_URL);

      cy.get('[data-id="health-score-high-value"]').within(() => {
        cy.findByText('90').should('be.visible');
      });

      cy.get('[data-id="health-score-low-value"]').within(() => {
        cy.findByText('10').should('be.visible');
      });
    });
  });

  describe('the subaccount table', () => {
    beforeEach(() => {
      cy.stubRequest({
        url: API_URL,
        fixture: 'signals/health-score/200.get.with-subaccounts.json',
        requestAlias: 'getHealthScore',
      });

      cy.visit(PAGE_URL);

      cy.wait('@getHealthScore');
    });

    it('renders each subaccount along with the current health score for that subaccount', () => {
      cy.get('tbody tr')
        .eq(0)
        .within(() => {
          cy.findByText('Fake Subaccount 1 (101)').should('be.visible');
          cy.findByText('10').should('be.visible'); // Current score
          cy.findByText('15').should('be.visible'); // Average score
        });

      cy.get('tbody tr')
        .eq(1)
        .within(() => {
          cy.findByText('Fake Subaccount 2 (102)').should('be.visible');
          cy.findByText('20').should('be.visible'); // Current score
          cy.findByText('25').should('be.visible'); // Average score
        });

      cy.get('tbody tr')
        .eq(2)
        .within(() => {
          cy.findByText('Fake Subaccount 3 (103)').should('be.visible');
          cy.findByText('30').should('be.visible'); // Current score
          cy.findByText('35').should('be.visible'); // Average score
        });
    });

    describe('sorting re-rerequests health score data', () => {
      beforeEach(() => {
        cy.stubRequest({
          url: API_URL,
          fixture: 'signals/health-score/200.get.no-results.json',
        });
      });

      it('re-requests data when clicking on "Subaccount"', () => {
        cy.findByText('Subaccount').click();

        cy.findByText('No Data Available').should('be.visible');
      });

      it('re-requests data when clicking on "Current Score"', () => {
        cy.findByText('Current Score').click();

        cy.findByText('No Data Available').should('be.visible');
      });

      it('re-requests data when clicking on "Current Injections"', () => {
        cy.findByText('Current Injections').click();

        cy.findByText('No Data Available').should('be.visible');
      });
    });
  });
});
