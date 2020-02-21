const PAGE_BASE_URL = '/blacklist/incidents';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const nth = function(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

describe('The blacklist incidents page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  it('navigates to the blacklist state and renders with a relevant page title/text for the empty state.', () => {
    cy.visit('/dashboard');

    cy.wait(500);
    cy.get('a')
      .findByText('Blacklist')
      .click(); // use the nav to get there

    cy.url().should('include', `${PAGE_BASE_URL}`);

    cy.title().should('include', 'Blacklist Incidents');

    cy.findByText(
      'Keep an eye on your Domains and IPs and maintain a healthy sender reputation and improve your deliverability',
    ).should('be.visible');
  });

  it(`goes to add to watchlist page from the call to action on ${PAGE_BASE_URL} page`, () => {
    cy.visit(`${PAGE_BASE_URL}`);
    cy.findByText('Add to Watchlist').click();
    cy.url().should('include', 'blacklist/watchlist/add');
  });

  it('sets the search in the url', () => {
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors',
      fixture: 'blacklists/incident/200-search.get.json',
    });
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors/incidents*',
      statusCode: 200,
      fixture: 'blacklists/incident/200.get.json',
    });

    cy.visit(`${PAGE_BASE_URL}`);

    cy.url().should('include', `${PAGE_BASE_URL}`);

    // We may have a bug with the titles only getting set correctly sometimes
    // cy.findByText('Blacklist Incidents').should('be.visible');

    cy.findByText('View Watchlist').should('be.visible');
    cy.findByText(
      'Check the current status of blacklists and learn more about what actions you can take to remedy and prevent future blacklisting.',
    ).should('be.visible');

    const filterInput = cy.findByLabelText('Filter By');
    filterInput.should('be.visible'); // placeholder text is dynamic...
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
      fixture: 'blacklists/incident/200-search.get.json',
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

  it('changes the date range', () => {
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors',
      fixture: 'blacklists/incident/200-search.get.json',
    });
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors/incidents*',
      statusCode: 200,
      fixture: 'blacklists/incident/200.get.json',
    });
    cy.visit(`${PAGE_BASE_URL}`);

    const today = new Date();
    const date = today.getDate();
    const month = months[today.getMonth()];

    cy.findByLabelText('Broad Date Range').select('Last 24 Hours');
    cy.findByLabelText('Narrow Date Range').then(val => {
      expect(val[0].value).to.equal(
        `${month.substring(0, 3)} ${date - 1}${nth(date - 1)} – ${month.substring(
          0,
          3,
        )} ${date}${nth(date)}`,
      );
    });

    cy.findByLabelText('Broad Date Range').select('Last 7 Days');
    cy.findByLabelText('Narrow Date Range').then(val => {
      expect(val[0].value).to.equal(
        `${month.substring(0, 3)} ${date - 7}${nth(date - 7)} – ${month.substring(
          0,
          3,
        )} ${date}${nth(date)}`,
      );
    });

    const thirtyDaysAgoTimestamp = new Date().setDate(today.getDate() - 30);
    const thirtyDaysAgo = new Date(thirtyDaysAgoTimestamp);
    const thirtyDaysAgoDate = thirtyDaysAgo.getDate();
    const thirtyDaysMonth = months[thirtyDaysAgo.getMonth()];

    cy.findByLabelText('Broad Date Range').select('Last 30 Days');
    cy.findByLabelText('Narrow Date Range').then(val => {
      expect(val[0].value).to.equal(
        `${thirtyDaysMonth.substring(0, 3)} ${thirtyDaysAgoDate}${nth(
          thirtyDaysAgoDate,
        )} – ${month.substring(0, 3)} ${date}${nth(date)}`,
      );
    });

    const ninetyDaysAgoTimestamp = new Date().setDate(today.getDate() - 90);
    const ninetyDaysAgo = new Date(ninetyDaysAgoTimestamp);
    const ninetyDaysAgoDate = ninetyDaysAgo.getDate();
    const ninetyDaysMonth = months[ninetyDaysAgo.getMonth()];

    cy.findByLabelText('Broad Date Range').select('Last 90 Days');
    cy.findByLabelText('Narrow Date Range').then(val => {
      expect(val[0].value).to.equal(
        `${ninetyDaysMonth.substring(0, 3)} ${ninetyDaysAgoDate}${nth(
          ninetyDaysAgoDate,
        )} – ${month.substring(0, 3)} ${date}${nth(date)}`,
      );
    });
  });

  it('sorts the table on resolved and listed', () => {
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors',
      fixture: 'blacklists/incident/200-search.get.json',
    });
    cy.stubRequest({
      method: 'GET',
      url: 'api/v1/blacklist-monitors/incidents*',
      statusCode: 200,
      fixture: 'blacklists/incident/200.get.json',
    });

    cy.visit(`${PAGE_BASE_URL}`);

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
