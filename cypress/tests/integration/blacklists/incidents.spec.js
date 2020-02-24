import moment from 'moment';
const utcFormatMatcher = /\d+-\d+-\d+T/g;
const PAGE_BASE_URL = '/blacklist/incidents';

describe('The blacklist incidents page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  it('navigates to the blacklist state and renders with a relevant page title/text for the empty state.', () => {
    cy.visit(PAGE_BASE_URL);
    cy.url().should('include', PAGE_BASE_URL);
    cy.title().should('include', 'Blacklist Incidents');
    cy.findByText(
      'Keep an eye on your Domains and IPs and maintain a healthy sender reputation and improve your deliverability',
    ).should('be.visible');
  });

  it(`goes to add to watchlist page from the call to action on ${PAGE_BASE_URL} page`, () => {
    cy.visit(PAGE_BASE_URL);
    cy.get('a')
      .findByText('Add to Watchlist')
      .should('have.attr', 'href', '/blacklist/watchlist/add');
  });

  it('sets the search in the url', () => {
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors',
      fixture: 'blacklists/incident/200.get.search.json',
    });
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors/incidents*',
      statusCode: 200,
      fixture: 'blacklists/incident/200.get.json',
    });

    cy.visit(PAGE_BASE_URL);

    cy.url().should('include', PAGE_BASE_URL);
    cy.findByText('Blacklist Incidents').should('be.visible');
    cy.findByText('View Watchlist').should('be.visible');
    cy.findByText(
      'Check the current status of blacklists and learn more about what actions you can take to remedy and prevent future blacklisting.',
    ).should('be.visible');

    const filterInput = cy.findByLabelText('Filter By');
    filterInput.should('be.visible');
    filterInput.type('2.2.8').blur();
    cy.url().should('include', '2.2.8');
    cy.get('tbody > tr').should('have.length', 1);
    cy.get('tbody > tr').within(el => {
      cy.findByText('2.2.8', { container: el }).should('be.visible');
      cy.findByText('new.spam.dnsbl.sorbs.net', { container: el }).should('be.visible');
      cy.findByText('Sep 8 2019, 7:00pm', { container: el }).should('be.visible');
      cy.findByText('Active', { container: el }).should('be.visible');
    });
  });

  it('searches through url param', () => {
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors',
      fixture: 'blacklists/incident/200.get.search.json',
    });
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors/incidents*',
      statusCode: 200,
      fixture: 'blacklists/incident/200.get.json',
    });

    cy.visit(`${PAGE_BASE_URL}?search=2.2.8`);

    cy.url().should('include', `${PAGE_BASE_URL}?search=2.2.8`);
    cy.url().should('include', '2.2.8');
    cy.get('tbody > tr').should('have.length', 1);
    cy.get('tbody > tr').within(el => {
      cy.findByText('2.2.8', { container: el }).should('be.visible');
      cy.findByText('new.spam.dnsbl.sorbs.net', { container: el }).should('be.visible');
      cy.findByText('Sep 8 2019, 7:00pm', { container: el }).should('be.visible');
      cy.findByText('Active', { container: el }).should('be.visible');
    });
  });

  it('changes the date range and makes the correct http call', () => {
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors',
      fixture: 'blacklists/incident/200.get.search.json',
    });
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors/incidents*',
      statusCode: 200,
      fixture: 'blacklists/incident/200.get.json',
      requestAlias: 'getIncidents',
    });
    cy.visit(PAGE_BASE_URL);

    const todaysDate = moment()
      .toISOString()
      .match(utcFormatMatcher)[0];
    const lastTwentyFour = moment()
      .subtract(1, 'days')
      .toISOString()
      .match(utcFormatMatcher)[0];
    const seven = moment()
      .subtract(7, 'days')
      .toISOString()
      .match(utcFormatMatcher)[0];
    const thirty = moment()
      .subtract(30, 'days')
      .toISOString()
      .match(utcFormatMatcher)[0];
    const ninety = moment()
      .subtract(90, 'days')
      .toISOString()
      .match(utcFormatMatcher)[0];

    cy.wait('@getIncidents').then(({ url }) => {
      cy.wrap(url).should('include', '/blacklist-monitors/incidents?from=' + thirty);
      cy.wrap(url).should('include', 'to=' + todaysDate);
    });

    cy.findByLabelText('Broad Date Range').select('Last 24 Hours');
    cy.wait('@getIncidents').then(({ url }) => {
      cy.wrap(url).should('include', '/blacklist-monitors/incidents?from=' + lastTwentyFour);
      cy.wrap(url).should('include', 'to=' + todaysDate);
    });

    cy.findByLabelText('Broad Date Range').select('Last 7 Days');
    cy.wait('@getIncidents').then(({ url }) => {
      cy.wrap(url).should('include', '/blacklist-monitors/incidents?from=' + seven);
      cy.wrap(url).should('include', 'to=' + todaysDate);
    });

    cy.findByLabelText('Broad Date Range').select('Last 30 Days');
    cy.wait('@getIncidents').then(({ url }) => {
      cy.wrap(url).should('include', '/blacklist-monitors/incidents?from=' + thirty);
      cy.wrap(url).should('include', 'to=' + todaysDate);
    });

    cy.findByLabelText('Broad Date Range').select('Last 90 Days');
    cy.wait('@getIncidents').then(({ url }) => {
      cy.wrap(url).should('include', '/blacklist-monitors/incidents?from=' + ninety);
      cy.wrap(url).should('include', 'to=' + todaysDate);
    });
  });

  it('sorts the table on resolved and listed', () => {
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors',
      fixture: 'blacklists/incident/200.get.search.json',
    });
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors/incidents*',
      statusCode: 200,
      fixture: 'blacklists/incident/200.get.json',
    });

    cy.visit(PAGE_BASE_URL);

    cy.get('tbody > tr:first-child').then(el => {
      cy.findAllByText('127.0.0.2', { container: el }).should('be.visible');
      cy.findAllByText('blacklist.lashback.com', { container: el }).should('be.visible');
      cy.findAllByText('Nov 20 2019, 11:14am', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });

    cy.get('tbody > tr:last-child').then(el => {
      cy.findAllByText('2.2.8', { container: el }).should('be.visible');
      cy.findAllByText('new.spam.dnsbl.sorbs.net', { container: el }).should('be.visible');
      cy.findAllByText('Sep 8 2019, 7:00pm', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });

    cy.findByText('Listed').click();

    cy.get('tbody > tr:last-child').then(el => {
      cy.findAllByText('127.0.0.2', { container: el }).should('be.visible');
      cy.findAllByText('blacklist.lashback.com', { container: el }).should('be.visible');
      cy.findAllByText('Nov 20 2019, 11:14am', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });

    cy.get('tbody > tr:first-child').then(el => {
      cy.findAllByText('2.2.8', { container: el }).should('be.visible');
      cy.findAllByText('new.spam.dnsbl.sorbs.net', { container: el }).should('be.visible');
      cy.findAllByText('Sep 8 2019, 7:00pm', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });

    cy.findByText('Resolved').click();

    cy.get('tbody > tr:first-child').then(el => {
      cy.findAllByText('127.0.0.2', { container: el }).should('be.visible');
      cy.findAllByText('blacklist.lashback.com', { container: el }).should('be.visible');
      cy.findAllByText('Nov 20 2019, 11:14am', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });

    cy.get('tbody > tr:last-child').then(el => {
      cy.findAllByText('2.2.8', { container: el }).should('be.visible');
      cy.findAllByText('new.spam.dnsbl.sorbs.net', { container: el }).should('be.visible');
      cy.findAllByText('Sep 8 2019, 7:00pm', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });

    cy.findByText('Resolved').click();

    cy.get('tbody > tr:first-child').then(el => {
      cy.findAllByText('127.0.0.2', { container: el }).should('be.visible');
      cy.findAllByText('blacklist.lashback.com', { container: el }).should('be.visible');
      cy.findAllByText('Nov 20 2019, 11:14am', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });

    cy.get('tbody > tr:last-child').then(el => {
      cy.findAllByText('2.2.8', { container: el }).should('be.visible');
      cy.findAllByText('new.spam.dnsbl.sorbs.net', { container: el }).should('be.visible');
      cy.findAllByText('Sep 8 2019, 7:00pm', { container: el }).should('be.visible');
      cy.findAllByText('Active', { container: el }).should('be.visible');
    });
  });
});
