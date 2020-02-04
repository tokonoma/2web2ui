const PAGE_URL = '/signals/health-score';
const API_URL = '/api/v1/signals/health-score/**/*';
const UNIX_STUBBED_DATE = 1580741099000; // Used to set the browser's date to February 2nd, 2020 to remain in step with fixtures

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
    beforeEach(() => cy.clock(UNIX_STUBBED_DATE));

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
      cy.clock(UNIX_STUBBED_DATE);

      cy.stubRequest({
        url: API_URL,
        fixture: 'signals/health-score/200.get.with-subaccounts.json',
        requestAlias: 'getHealthScore',
      });

      cy.visit(PAGE_URL);

      cy.wait('@getHealthScore');
      cy.wait('@getHealthScore'); // Two requests are made
    });

    it.only('renders each subaccount along with the current health score for that subaccount', () => {
      function assertTableRow({
        rowIndex,
        subaccount,
        currentScore,
        currentInjections,
        WoW,
        averageScore,
      }) {
        cy.get('tbody tr')
          .eq(rowIndex)
          .within(() => {
            cy.get('td')
              .eq(0)
              .within(() => cy.findByText(subaccount).should('be.visible'));
            cy.get('td')
              .eq(2)
              .within(() => cy.findByText(currentScore.toString()).should('be.visible'));
            cy.get('td')
              .eq(3)
              .within(() => cy.findByText(currentInjections.toString()).should('be.visible'));
            cy.get('td')
              .eq(4)
              .within(() => cy.findByText(WoW).should('be.visible'));
            cy.get('td')
              .eq(5)
              .within(() => cy.findByText(averageScore.toString()).should('be.visible'));
          });
      }
      // Grabbing the data in each of the cells in the table row. The chart isn't interpretable
      // by Cypress, which indicates an a11y problem.

      assertTableRow({
        rowIndex: 0,
        subaccount: 'Master Account',
        currentScore: 10,
        currentInjections: 12,
        WoW: '10%',
        averageScore: 15,
      });

      assertTableRow({
        rowIndex: 1,
        subaccount: 'Fake Subaccount 1 (101)',
        currentScore: 20,
        currentInjections: 34,
        WoW: '20%',
        averageScore: 25,
      });

      assertTableRow({
        rowIndex: 2,
        subaccount: 'Fake Subaccount 2 (102)',
        currentScore: 30,
        currentInjections: 56,
        WoW: '30%',
        averageScore: 35,
      });

      assertTableRow({
        rowIndex: 3,
        subaccount: 'Fake Subaccount 3 (103)',
        currentScore: 40,
        currentInjections: 78,
        WoW: '40%',
        averageScore: 45,
      });
    });

    describe('sorting re-rerequests health score data', () => {
      beforeEach(() => {
        cy.stubRequest({
          url: API_URL,
          fixture: 'signals/health-score/200.get.no-results.json',
        });
      });

      // it('re-requests data when filtering by "Master Account"', () => {
      //   cy.findByText('Master & All Subaccounts')
      //     .closest('button') // This is an a11y bug! The
      //     .click();
      //   cy.findByText('Master Account').click();

      //   cy.findByText('No Data Available').should('be.visible');
      // });

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
