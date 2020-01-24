// TODO: Add testing for subaccount reporting user role

const PAGE_URL = '/dashboard';

describe('Mobile Navigation', () => {
  const accountDropdownSelector = '[data-id="nav-button-accounts"]';
  const navigationButtonSelector = '[data-id="nav-button-mobilemenu"]';
  const navigationListSelector = '[data-id="navigation-list"]';
  const accountDropdownListSelector = '[data-id="account-dropdown-list"]';

  function clickMenuItem(menuItemName) {
    cy.contains(menuItemName).click();
  }

  function openNavigation() {
    cy.get(navigationButtonSelector).click();
  }

  function openAccountMenu() {
    cy.get(accountDropdownSelector).click();
  }

  function assertNavigationIsVisible() {
    cy.get(navigationListSelector).should('be.visible');
  }

  function assertNavigationIsNotVisible() {
    cy.get(navigationListSelector).should('not.be.visible');
  }

  function assertAccountMenuIsVisible() {
    cy.get(accountDropdownListSelector).should('be.visible');
  }

  function assertAccountMenuIsNotVisible() {
    cy.get(accountDropdownListSelector).should('not.be.visible');
  }

  function assertAllSignalsAnalyticsLinks() {
    cy.get(navigationListSelector).within(() => {
      // Signals Analytics section and subitems
      cy.queryByText('Signals Analytics').click();

      cy.assertLink({
        content: 'Summary',
        href: '/reports/summary',
      });
      cy.assertLink({
        content: 'Bounce',
        href: '/reports/bounce',
      });
      cy.assertLink({
        content: 'Rejections',
        href: '/reports/rejections',
      });
      cy.assertLink({
        content: 'Accepted',
        href: '/reports/accepted',
      });
      cy.assertLink({
        content: 'Delayed',
        href: '/reports/delayed',
      });
      cy.assertLink({
        content: 'Health Score',
        href: '/signals/health-score',
      });
      cy.assertLink({
        content: 'Spam Traps',
        href: '/signals/spam-traps',
      });
      cy.assertLink({
        content: 'Engagement Recency',
        href: '/signals/engagement',
      });
      cy.assertLink({
        content: 'Engagement',
        href: '/reports/engagement',
      });
    });
  }

  function stubGrantsRequest({ role }) {
    cy.stubRequest({
      url: '/api/v1/authenticate/grants*',
      fixture: `authenticate/grants/200.get.${role}.json`,
    });

    cy.visit(PAGE_URL);

    cy.wait('@stubbedAccountRequest'); // Waits stubbed account request to come through
    cy.wait('@stubbedAccountRequest'); // ...the request is made twice! So wait again for the second
  }

  describe('navigation behavior', () => {
    beforeEach(() => {
      cy.viewport(500, 1000);
      cy.stubAuth();
      cy.login({ isStubbed: true });
      /*
        Wait is included to wait for window resize event as mobile navigation
        is controlled via window resize events instead of CSS. Ideally, CSS media
        queries could be used to show and hide the two version of the navigation
        to improve performance and reduce the likelihood of unusual
        application states
      */
      cy.visit(PAGE_URL);
      cy.wait(500);
    });

    it('opens when clicking on the hamburger icon', () => {
      openNavigation();
      assertNavigationIsVisible();
    });

    it('stays open after clicking menu item with child', () => {
      openNavigation();
      clickMenuItem('Signals Analytics');
      assertNavigationIsVisible();
      cy.contains('Bounce').should('be.visible');
    });

    it('closes after clicking child menu item', () => {
      openNavigation();
      clickMenuItem('Signals Analytics');
      clickMenuItem('Bounce');
      assertNavigationIsNotVisible();
    });

    it('closes after clicking top level menu item with no children', () => {
      openNavigation();
      clickMenuItem('Events');
      assertNavigationIsNotVisible();
    });

    it('closes after opening admin menu', () => {
      openNavigation();
      openAccountMenu();
      assertNavigationIsNotVisible();
      assertAccountMenuIsVisible();
    });

    it('causes admin menu to close after opening', () => {
      openAccountMenu();
      openNavigation();
      assertNavigationIsVisible();
      assertAccountMenuIsNotVisible();
    });
  });

  describe('the navigation content', () => {
    beforeEach(() => {
      cy.stubAuth();
      cy.login({ isStubbed: true });
    });

    describe('as an admin', () => {
      beforeEach(() => {
        stubGrantsRequest({ role: 'admin' });
        cy.visit(PAGE_URL);
      });

      it('renders with a "Dashboard" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Dashboard',
            href: '/dashboard',
          });
        });
      });

      it('renders all available links within "Signals Analytics"', () => {
        assertAllSignalsAnalyticsLinks();
      });

      it('renders a link to "Events"', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Events',
            href: '/reports/message-events',
          });
        });
      });

      it('renders the links within the "Content" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Content').click();

          cy.assertLink({
            content: 'Templates',
            href: '/templates',
          });
          cy.assertLink({
            content: 'A/B Testing',
            href: '/ab-testing',
          });
          cy.assertLink({
            content: 'Snippets',
            href: '/snippets',
          });
        });
      });

      it('renders the links within the "Recipients" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Recipients').click();

          cy.assertLink({
            content: 'Recipient Validation',
            href: '/recipient-validation/list',
          });
          cy.assertLink({
            content: 'Recipient Lists',
            href: '/lists/recipient-lists',
          });
          cy.assertLink({
            content: 'Suppressions',
            href: '/lists/suppressions',
          });
        });
      });

      it('renders with an "Alerts" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Alerts',
            href: '/alerts',
          });
        });
      });

      it('renders the "Configuration" section links', () => {
        cy.get(navigationListSelector).within(() => {
          cy.findByText('Configuration').click();

          cy.assertLink({
            content: 'Webhooks',
            href: '/webhooks',
          });
          cy.assertLink({
            content: 'IP Pools',
            href: '/account/ip-pools',
          });
          cy.assertLink({
            content: 'API Keys',
            href: '/account/api-keys',
          });
          cy.assertLink({
            content: 'SMTP Settings',
            href: '/account/smtp',
          });
          cy.assertLink({
            content: 'Sending Domains',
            href: '/account/sending-domains',
          });
          cy.assertLink({
            content: 'Tracking Domains',
            href: '/account/tracking-domains',
          });
          cy.assertLink({
            content: 'Subaccounts',
            href: '/account/subaccounts',
          });
        });
      });

      it('renders relevant links in the account menu', () => {
        openAccountMenu();

        cy.get(accountDropdownListSelector).within(() => {
          cy.assertLink({
            content: 'Account Settings',
            href: '/account/settings',
          });
          cy.assertLink({
            content: 'Profile',
            href: '/account/profile',
          });
          cy.assertLink({
            content: 'Billing',
            href: '/account/billing',
          });
          cy.assertLink({
            content: 'Billing',
            href: '/account/billing',
          });
          cy.assertLink({
            content: 'Manage Users',
            href: '/account/users',
          });

          cy.queryByText('Get Help').should('be.visible');

          cy.assertLink({
            content: 'API Docs',
            href: 'https://developers.sparkpost.com/api',
          });

          cy.assertLink({
            content: 'Log Out',
            href: '/logout',
          });
        });
      });
    });

    describe('as a templates user', () => {
      beforeEach(() => {
        stubGrantsRequest({ role: 'templates' });
        cy.visit(PAGE_URL);
      });

      it('renders with a "Dashboard" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Dashboard',
            href: '/dashboard',
          });
        });
      });

      it('renders all available links within "Signals Analytics"', () => {
        assertAllSignalsAnalyticsLinks();
      });

      it('renders a link to "Events"', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Events',
            href: '/reports/message-events',
          });
        });
      });

      it('renders the links within the "Content" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Content').click();

          cy.assertLink({
            content: 'Templates',
            href: '/templates',
          });
          cy.assertLink({
            content: 'A/B Testing',
            href: '/ab-testing',
          });
          cy.assertLink({
            content: 'Snippets',
            href: '/snippets',
          });
        });
      });

      it('renders the links within the "Recipients" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Recipients').click();

          cy.assertLink({
            content: 'Recipient Lists',
            href: '/lists/recipient-lists',
          });
          cy.assertLink({
            content: 'Suppressions',
            href: '/lists/suppressions',
          });
        });
      });

      it('renders with an "Alerts" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Alerts',
            href: '/alerts',
          });
        });
      });

      it('does not render the "Configuration" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Configuration').should('not.be.visible');
        });
      });

      it('renders relevant links in the account menu', () => {
        openAccountMenu();

        cy.get(accountDropdownListSelector).within(() => {
          cy.queryByText('Account Settings').should('not.be.visible');

          cy.assertLink({
            content: 'Profile',
            href: '/account/profile',
          });
          cy.queryByText('Get Help').should('be.visible');
          cy.assertLink({
            content: 'API Docs',
            href: 'https://developers.sparkpost.com/api',
          });
          cy.assertLink({
            content: 'Log Out',
            href: '/logout',
          });
        });
      });
    });

    describe('as a reporting user', () => {
      beforeEach(() => {
        stubGrantsRequest({ role: 'reporting' });
        cy.visit(PAGE_URL);
      });

      it('renders with a "Dashboard" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Dashboard',
            href: '/dashboard',
          });
        });
      });

      it('renders all available links within "Signals Analytics"', () => {
        assertAllSignalsAnalyticsLinks();
      });

      it('renders a link to "Events"', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Events',
            href: '/reports/message-events',
          });
        });
      });

      it('renders the links within the "Content" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Content').click();

          cy.assertLink({
            content: 'Templates',
            href: '/templates',
          });
          cy.assertLink({
            content: 'Snippets',
            href: '/snippets',
          });
        });
      });

      it('does not render the "Recipients" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Recipients').should('not.be.visible');
        });
      });

      it('renders with an "Alerts" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Alerts',
            href: '/alerts',
          });
        });
      });

      it('renders relevant links in the account menu', () => {
        openAccountMenu();

        cy.get(accountDropdownListSelector).within(() => {
          cy.assertLink({
            content: 'Profile',
            href: '/account/profile',
          });
          cy.assertLink({
            content: 'API Docs',
            href: 'https://developers.sparkpost.com/api',
          });
          cy.assertLink({
            content: 'Log Out',
            href: '/logout',
          });

          cy.queryByText('Billing').should('not.be.visible');
          cy.queryByText('Manage Users').should('not.be.visible');
          cy.queryByText('Get Help').should('be.visible');
        });
      });
    });

    describe('as a developer user', () => {
      beforeEach(() => {
        stubGrantsRequest({ role: 'reporting' });
        cy.visit(PAGE_URL);
      });

      it('renders with a "Dashboard" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Dashboard',
            href: '/dashboard',
          });
        });
      });

      it('renders all available links within "Signals Analytics"', () => {
        cy.get(navigationListSelector).within(() => {
          // Signals Analytics section and subitems
          cy.queryByText('Signals Analytics').click();

          cy.assertLink({
            content: 'Summary',
            href: '/reports/summary',
          });
          cy.assertLink({
            content: 'Bounce',
            href: '/reports/bounce',
          });
          cy.assertLink({
            content: 'Rejections',
            href: '/reports/rejections',
          });
          cy.assertLink({
            content: 'Accepted',
            href: '/reports/accepted',
          });
          cy.assertLink({
            content: 'Delayed',
            href: '/reports/delayed',
          });
          cy.assertLink({
            content: 'Health Score',
            href: '/signals/health-score',
          });
          cy.assertLink({
            content: 'Spam Traps',
            href: '/signals/spam-traps',
          });
          cy.assertLink({
            content: 'Engagement Recency',
            href: '/signals/engagement',
          });
          cy.assertLink({
            content: 'Engagement',
            href: '/reports/engagement',
          });
        });
      });

      it('renders a link to "Events"', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Events',
            href: '/reports/message-events',
          });
        });
      });

      it('renders the links within the "Content" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Content').click();

          cy.assertLink({
            content: 'Templates',
            href: '/templates',
          });
          cy.assertLink({
            content: 'Snippets',
            href: '/snippets',
          });
        });
      });

      it('does not render the "Recipients" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Recipients').should('not.be.visible');
        });
      });

      it('renders with an "Alerts" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Alerts',
            href: '/alerts',
          });
        });
      });

      it('renders relevant links in the account menu', () => {
        openAccountMenu();

        cy.get(accountDropdownListSelector).within(() => {
          cy.assertLink({
            content: 'Profile',
            href: '/account/profile',
          });
          cy.assertLink({
            content: 'API Docs',
            href: 'https://developers.sparkpost.com/api',
          });
          cy.assertLink({
            content: 'Log Out',
            href: '/logout',
          });

          cy.queryByText('Billing').should('not.be.visible');
          cy.queryByText('Manage Users').should('not.be.visible');
          cy.queryByText('Get Help').should('be.visible');
        });
      });
    });

    describe('as a subaccount reporting user', () => {
      beforeEach(() => {
        stubGrantsRequest({ role: 'subaccount-reporting' });
        cy.visit(PAGE_URL);
      });

      it('renders with a "Dashboard" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Dashboard',
            href: '/dashboard',
          });
        });
      });

      it('renders all available links within "Signals Analytics"', () => {
        assertAllSignalsAnalyticsLinks();
      });

      it('renders a link to "Events"', () => {
        cy.get(navigationListSelector).within(() => {
          cy.assertLink({
            content: 'Events',
            href: '/reports/message-events',
          });
        });
      });

      it('renders the links within the "Content" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Content').click();

          cy.assertLink({
            content: 'Templates',
            href: '/templates',
          });
          cy.assertLink({
            content: 'Snippets',
            href: '/snippets',
          });
        });
      });

      it('does not render the "Recipients" section', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Recipients').should('not.be.visible');
        });
      });

      it('renders with an "Alerts" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Alerts').should('not.be.visible');
        });
      });

      it('does not render the "Configuration" link', () => {
        cy.get(navigationListSelector).within(() => {
          cy.queryByText('Configuration').should('not.be.visible');
        });
      });

      it('renders relevant links in the account menu', () => {
        openAccountMenu();

        cy.get(accountDropdownListSelector).within(() => {
          cy.assertLink({ content: 'Profile', href: '/account/profile' });
          cy.queryByText('Get Help').should('be.visible');
          cy.assertLink({ content: 'API Docs', href: 'https://developers.sparkpost.com/api' });
          cy.assertLink({ content: 'Log Out', href: '/logout' });
        });
      });
    });

    it('renders the "Blacklist" feature when the user\'s account has the feature enabled', () => {
      cy.stubRequest({
        url: '/api/v1/account*',
        fixture: 'account/200.get.has-blacklist-feature.json',
      });

      cy.visit(PAGE_URL);

      cy.queryByText('Blacklist').should('be.visible');
    });

    it('does not render the "Blacklist" feature when the user\'s account has the feature disabled', () => {
      cy.stubRequest({
        url: '/api/v1/account*',
        fixture: 'account/200.get.does-not-have-blacklist-feature.json',
      });

      cy.visit(PAGE_URL);

      cy.queryByText('Blacklist').should('not.be.visible');
    });

    it('renders the "Inbox Placement" feature when the user\'s account has the feature enabled', () => {
      cy.stubRequest({
        url: '/api/v1/account*',
        fixture: 'account/200.get.has-inbox-placement.json',
      });

      cy.visit(PAGE_URL);

      cy.queryByText('Inbox Placement').should('be.visible');
    });

    it('does not render the "Inbox Placement" feature when the user\'s account has the feature enabled', () => {
      cy.stubRequest({
        url: '/api/v1/account*',
        fixture: 'account/200.get.does-not-have-inbox-placement.json',
      });

      cy.visit(PAGE_URL);

      cy.queryByText('Inbox Placement').should('not.be.visible');
    });
  });
});
