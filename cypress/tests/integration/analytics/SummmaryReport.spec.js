/// <reference types="Cypress" />

describe('Summary Report page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      method: 'GET',
      url: '/api/v1/metrics/**',
      fixture: 'metrics/200.get.metrics-filters.json',
      requestAlias: 'getMetricsFilterOptions',
    });

    cy.stubRequest({
      method: 'GET',
      url: '/api/v1/metrics/deliverability**/**',
      fixture: 'metrics/deliverability/200.get.json',
      requestAlias: 'dataGetDeliverability',
    });

    cy.stubRequest({
      method: 'GET',
      url: '/api/v1/metrics/deliverability/time-series**/**',
      fixture: 'metrics/deliverability/time-series/200.get.json',
      requestAlias: 'dataGetTimeSeries',
    });

    cy.stubRequest({
      method: 'GET',
      url: '/api/v1/metrics/deliverability/campaign**/**',
      fixture: 'metrics/deliverability/campaign/200.get.json',
      requestAlias: 'getDataCampaign',
    });

  });

  it('Handles changing the date range correctly', () => {
    const timestamp = 1580392800000; //01/30/2020 @ 2:00pm (UTC)
    const momentDateTime = Cypress.moment(timestamp);
    const now = momentDateTime.local().format('MMM Do YYYY h:mma');
    const getDatePickerText = startDateTime => `${startDateTime} – ${now}`; //Use this dash: '–' ¯\_(ツ)_/¯
    cy.clock(timestamp);
    cy.visit('/reports/summary');

    const dayAgo = momentDateTime
      .subtract(1, 'day')
      .local()
      .format('MMM Do YYYY h:mma');
    cy.url().should('not.include', 'range=7days');
    cy.get('[data-id="report-options"]').within(() => {
      cy.get('input').should('have.value', getDatePickerText(dayAgo));
      cy.get('select').select('7days');
    });

    const sevenDaysAgo = momentDateTime
      .subtract(6, 'day')
      .local()
      .startOf('day')
      .format('MMM Do YYYY h:mma');
    cy.url().should('include', 'range=7days');
    cy.get('[data-id="report-options"]').within(() => {
      cy.get('input').should('have.value', getDatePickerText(sevenDaysAgo));
    });
  });

  it('Handles applying filters correctly', () => {
    cy.visit('/reports/summary');
    cy.get('[data-id="report-options"]').within(() => {
      cy.findByPlaceholderText('Filter by domain, campaign, etc').type('sparkpost');
      cy.wait('@getMetricsFilterOptions');
      const filter = cy.get('a');
      filter.within(() => {
        cy.findByText('sparkpost-test').should('be.visible');
      });
      filter.click({force: true});
      cy.findByText('Campaign: sparkpost-test').should('be.visible');
    });
  });

  it('Handles changing metrics correctly', () => {
    cy.visit('/reports/summary');
    cy.get('[data-id="summary-chart"]').within(() => {
      cy.findByText('Accepted').should('be.visible');
      cy.findByText('Select Metrics').click();
    });

    cy.findByText('Select up to 5 metrics').should('be.visible');
    cy.findByLabelText('Accepted').uncheck({ force: true });
    cy.findByLabelText('Accepted').uncheck({ force: true });
    cy.findByLabelText('Injected').check({ force: true });
    cy.findByText('Apply Metrics').click();

    cy.get('[data-id="summary-chart"]').within(() => {
      cy.findByText('Accepted').should('not.be.visible');
      cy.findByText('Injected').should('be.visible');
    });
  });

  //Breaks in Travis CI
  /*  it('Handles changing group by metric in the table', () => {
      cy.visit('/reports/summary');
      cy.get('[data-id="summary-table"]').within(() => cy.get('select').select('campaign'));
      cy.wait('@getDataCampaign');
      cy.findByText('Free Beer').should('be.visible');
    });*/
});
