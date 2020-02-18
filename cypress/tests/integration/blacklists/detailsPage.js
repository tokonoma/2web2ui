describe('Blacklist Incident Details Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/blacklist-monitors/incidents/7',
      fixture: 'blacklists/single/200.get.json',
      requestAlias: 'singleIncident',
    });

    cy.stubRequest({
      url: '/api/v1/blacklist-monitors/incidents?**',
      fixture: 'blacklists/200.get.other-recent.json',
      requestAlias: 'otherIncidents',
    });

    cy.stubRequest({
      url: '/api/v1/blacklist-monitors/sparkpost.io/incidents**',
      fixture: 'blacklists/200.get.historical-incidents.json',
      requestAlias: 'historicalIncidents',
    });
  });

  it('Loads blacklist Incident', () => {
    const timestamp = 1580392800000; //01/30/2020 @ 2:00pm (UTC)
    cy.clock(timestamp);
    cy.visit('/blacklist/incidents/7');
    cy.findByText('Blacklist Incident | sparkpost.io | abuseat.org (CBL)').should('be.visible');

    cy.get('[data-id=incident-details]').within(() => {
      cy.findByText('Dec 25 2019').should('be.visible');
      cy.findByText('Active').should('be.visible');
      cy.findByText('36').should('be.visible');
      cy.findByText('Listed Nov 20 2019, 12:14pm | Resolved Nov 20 2019, 12:58pm').should(
        'be.visible',
      );
    });

    cy.get('[data-id=related-incidents-blacklist]').within(() => {
      cy.findByText('127.0.0.2').should('be.visible');
      cy.findByText('Listed Nov 20 2019, 12:14pm').should('be.visible');
      cy.findByText('Active').should('be.visible');
      cy.findByText('123.123.123.1').should('be.visible');
      cy.findByText('Dec 26 2019, 4:30am').should('be.visible');
    });

    cy.get('[data-id=related-incidents-resource]').within(() => {
      cy.findByText('new.spam.dnsbl.sorbs.net').should('be.visible');
      cy.findByText('Listed Dec 25 2019, 2:30am').should('be.visible');
      cy.findByText('Active').should('be.visible');
    });
  });

  it('Shows error component when there is an error', () => {
    cy.stubRequest({
      statusCode: 400,
      url: '/api/v1/blacklist-monitors/incidents/**',
      fixture: 'blacklists/400.get.json',
      requestAlias: 'incidentError',
    });

    cy.visit('/blacklist/incidents/7');
    cy.get('[data-id=error-banner]').should('be.visible');
  });

  describe('Incident Details', () => {
    it('Displays alternative text when there are no historical incidents', () => {
      cy.stubRequest({
        url: '/api/v1/blacklist-monitors/sparkpost.io/incidents**',
        fixture: '/200.get.no-results.json',
        requestAlias: 'historicalIncidentsEmpty',
      });
      cy.visit('/blacklist/incidents/7');
      cy.wait('@historicalIncidentsEmpty');
      cy.findByText('No historical incidents for sparkpost.io on abuseat.org (CBL)').should(
        'be.visible',
      );
    });

    it('Clicking "View Engagement" deep links to filtered summary report page', () => {
      cy.visit('/blacklist/incidents/7');
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
        url: '/api/v1/blacklist-monitors/incidents?blacklists=**',
        fixture: '/200.get.no-results.json',
        requestAlias: 'recentOtherIncidentsEmpty',
      });
      cy.visit('/blacklist/incidents/7');
      cy.findByText('No Other Recent abuseat.org (CBL) incidents').should('be.visible');
    });

    it('Clicking another incident redirects to that incident\'s detail page', () => {
      cy.visit('/blacklist/incidents/7');

      cy.get('[data-id=related-incidents-blacklist]').within(() => {
        cy.get('a').contains('127.0.0.2').click();
      });
      cy.url().should('include', '/blacklist/incidents/9');
    });
  });

  describe('Related Incidents (resource)', () => {
    it('Displays alternative text when there are no other recent incidents', () => {
      cy.stubRequest({
        url: '/api/v1/blacklist-monitors/incidents?resources=**',
        fixture: '/200.get.no-results.json',
        requestAlias: 'recentOtherIncidentsEmpty',
      });
      cy.visit('/blacklist/incidents/7');
      cy.findByText('No Other Recent sparkpost.io incidents').should('be.visible');
    });

    it('Clicking another incident redirects to that incident\'s detail page', () => {
      cy.visit('/blacklist/incidents/7');

      cy.get('[data-id=related-incidents-resource]').within(() => {
        cy.get('a').contains('new.spam.dnsbl.sorbs.net').click();
      });
      cy.url().should('include', '/blacklist/incidents/8');
    });
  });
});
