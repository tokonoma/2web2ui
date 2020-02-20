const PAGE_URL = '/blacklist/incidents/7';
const BLACKLIST_BASE_API_URL = '/api/v1/blacklist-monitors';

describe('Blacklist Incident Details Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: `${BLACKLIST_BASE_API_URL}/incidents/7`,
      fixture: 'blacklists/single/200.get.json',
      requestAlias: 'singleIncident',
    });

    cy.stubRequest({
      url: `${BLACKLIST_BASE_API_URL}/incidents?**`,
      fixture: 'blacklists/200.get.other-recent.json',
      requestAlias: 'otherIncidents',
    });

    cy.stubRequest({
      url: `${BLACKLIST_BASE_API_URL}/sparkpost.io/incidents**`,
      fixture: 'blacklists/200.get.historical-incidents.json',
      requestAlias: 'historicalIncidents',
    });
  });

  it('has a relevant page title', () => {
    cy.visit(PAGE_URL);
    cy.title().should('include', 'Incident Details | Blacklist');
  });


  it('Loads blacklist Incident', () => {
    const timestamp = 1580392800000; //01/30/2020 @ 2:00pm (UTC)
    cy.clock(timestamp);
    cy.visit(PAGE_URL);
    //Separated into 2 waits bc the page calls the incidents endpoint first and then calls the other 3 async
    cy.wait('@singleIncident');
    cy.wait(['@otherIncidents', '@otherIncidents', '@historicalIncidents']);

    cy.findByText('Blacklist Incident | sparkpost.io | abuseat.org (CBL)').should('be.visible');

    cy.get('[data-id=incident-details]').within(() => {
      cy.findByText('Dec 25 2019').should('be.visible');
      cy.findByText('Active').should('be.visible');
      cy.findByText('36').should('be.visible');
      cy.findByText(
        /Listed Nov 2[012] 2019, \d*:14[ap]m | Resolved Nov 2[012] 2019, \d*:58[ap]m/,
      ).should('be.visible');
    });

    cy.get('[data-id=related-incidents-blacklist]').within(() => {
      cy.findByText('127.0.0.2').should('be.visible');
      cy.findByText(/Listed Nov 2[012] 2019, \d*:14[ap]m/).should('be.visible');
      cy.findByText('Active').should('be.visible');
      cy.findByText('123.123.123.1').should('be.visible');
      cy.findByText(/Listed Dec 2[567] 2019, \d*:30[ap]m/).should('be.visible');
    });

    cy.get('[data-id=related-incidents-resource]').within(() => {
      cy.findByText('new.spam.dnsbl.sorbs.net').should('be.visible');
      cy.findByText(/Listed Dec 2[567] 2019, \d*:30[ap]m/).should('be.visible');
      cy.findByText('Active').should('be.visible');
    });
  });

  it('Shows error component when there is an error', () => {
    cy.stubRequest({
      statusCode: 400,
      url: `${BLACKLIST_BASE_API_URL}/incidents/**`,
      fixture: 'blacklists/400.get.json',
      requestAlias: 'incidentError',
    });

    cy.visit(PAGE_URL);
    cy.findByText('An error occurred').should('be.visible');
    cy.findByText('Sorry, we seem to have had some trouble loading your blacklist incidents.').should('be.visible');
    cy.findByText('Show Error Details').click();
    cy.findByText('Hey look, an error').should('be.visible');
  });

  describe('Incident Details', () => {
    it('Displays alternative text when there are no historical incidents', () => {
      cy.stubRequest({
        url: `${BLACKLIST_BASE_API_URL}/sparkpost.io/incidents**`,
        fixture: '/200.get.no-results.json',
        requestAlias: 'historicalIncidentsEmpty',
      });
      cy.visit(PAGE_URL);
      cy.wait('@historicalIncidentsEmpty');
      cy.findByText('No historical incidents for sparkpost.io on abuseat.org (CBL)').should(
        'be.visible',
      );
    });

    it('Clicking "View Engagement" deep links to filtered summary report page', () => {
      cy.visit(PAGE_URL);
      cy.findByText('View Engagement').click();

      cy.url().should('include', '/reports/summary?filters=Sending%20Domain%3Asparkpost.io');
      //Within summary report, find the filter tag
      cy.get('[data-id="report-options"]').within(() => {
        cy.findByText('Sending Domain: sparkpost.io').should('be.visible');
      });
    });
  });

  describe('Related Incidents (blacklist)', () => {
    it('Displays alternative text when there are no other recent incidents', () => {
      cy.stubRequest({
        url: `${BLACKLIST_BASE_API_URL}/incidents?blacklists=**`,
        fixture: '/200.get.no-results.json',
        requestAlias: 'recentOtherIncidentsEmpty',
      });
      cy.visit(PAGE_URL);
      cy.wait('@recentOtherIncidentsEmpty');
      cy.findByText('No Other Recent abuseat.org (CBL) incidents').should('be.visible');
    });

    it("Clicking another incident redirects to that incident's detail page", () => {
      cy.visit(PAGE_URL);

      cy.get('[data-id=related-incidents-blacklist]').within(() => {
        cy.get('a')
          .contains('127.0.0.2')
          .click();
      });
      cy.url().should('include', '/blacklist/incidents/9');
    });
  });

  describe('Related Incidents (resource)', () => {
    it('Displays alternative text when there are no other recent incidents', () => {
      cy.stubRequest({
        url: `${BLACKLIST_BASE_API_URL}/incidents?resources=**`,
        fixture: '/200.get.no-results.json',
        requestAlias: 'recentOtherIncidentsEmpty',
      });
      cy.visit(PAGE_URL);
      cy.wait('@recentOtherIncidentsEmpty');
      cy.findByText('No Other Recent sparkpost.io incidents').should('be.visible');
    });

    it("Clicking another incident redirects to that incident's detail page", () => {
      cy.visit(PAGE_URL);

      cy.get('[data-id=related-incidents-resource]').within(() => {
        cy.get('a')
          .contains('new.spam.dnsbl.sorbs.net')
          .click();
      });
      cy.url().should('include', '/blacklist/incidents/8');
    });
  });
});
