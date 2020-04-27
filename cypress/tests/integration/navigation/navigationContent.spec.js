const PAGE_URL = '/dashboard';
const accountDropdownSelector = '[data-id="nav-button-accounts"]';
const navigationListSelector = '[data-id="navigation-list"]';
const accountDropdownListSelector = '[data-id="account-dropdown-list"]';

function beforeSteps() {
  cy.stubAuth();
  cy.login({ isStubbed: true });
}

function openAccountMenu() {
  cy.get(accountDropdownSelector).click();
}

function assertAllSignalsAnalyticsLinks() {
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

  cy.queryByText('Signals Analytics').click();
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

if (Cypress.env('DEFAULT_TO_HIBANA') === 'false') {
  describe('The navigation content as an admin', () => {
    beforeEach(() => {
      beforeSteps();
      stubGrantsRequest({ role: 'admin' });
      cy.visit(PAGE_URL);
    });

    it('renders with relevant links', () => {
      cy.get(navigationListSelector).within(() => {
        cy.assertLink({
          content: 'Dashboard',
          href: '/dashboard',
        });
        assertAllSignalsAnalyticsLinks();
        cy.assertLink({
          content: 'Events',
          href: '/reports/message-events',
        });

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

        cy.queryByText('Content').click();

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
        cy.assertLink({
          content: 'Alerts',
          href: '/alerts',
        });

        cy.queryByText('Recipients').click();

        cy.findByText('Configuration')
          .scrollIntoView()
          .click();

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

  describe('The navigation content as a templates user', () => {
    beforeEach(() => {
      beforeSteps();
      stubGrantsRequest({ role: 'templates' });
      cy.visit(PAGE_URL);
    });

    it('renders with relevant links', () => {
      cy.get(navigationListSelector).within(() => {
        cy.assertLink({
          content: 'Dashboard',
          href: '/dashboard',
        });
        assertAllSignalsAnalyticsLinks();
      });
      cy.assertLink({
        content: 'Events',
        href: '/reports/message-events',
      });
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

      cy.queryByText('Content').click();

      cy.queryByText('Recipients').click();

      cy.assertLink({
        content: 'Recipient Lists',
        href: '/lists/recipient-lists',
      });
      cy.assertLink({
        content: 'Suppressions',
        href: '/lists/suppressions',
      });
      cy.assertLink({
        content: 'Alerts',
        href: '/alerts',
      });
      cy.queryByText('Recipients').click();
      cy.queryByText('Configuration').should('not.be.visible');
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

  describe('The navigation content as a reporting user', () => {
    beforeEach(() => {
      beforeSteps();
      stubGrantsRequest({ role: 'reporting' });
      cy.visit(PAGE_URL);
    });

    it('renders with relevant links', () => {
      cy.get(navigationListSelector).within(() => {
        cy.assertLink({
          content: 'Dashboard',
          href: '/dashboard',
        });
        assertAllSignalsAnalyticsLinks();
        cy.assertLink({
          content: 'Events',
          href: '/reports/message-events',
        });
        cy.queryByText('Content').click();

        cy.assertLink({
          content: 'Templates',
          href: '/templates',
        });
        cy.assertLink({
          content: 'Snippets',
          href: '/snippets',
        });
        cy.queryByText('Content').click();
        cy.queryByText('Recipients').should('not.be.visible');
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

  describe('The navigation content as a developer user', () => {
    beforeEach(() => {
      beforeSteps();
      stubGrantsRequest({ role: 'reporting' });
      cy.visit(PAGE_URL);
    });

    it('renders with relevant links', () => {
      cy.get(navigationListSelector).within(() => {
        cy.assertLink({
          content: 'Dashboard',
          href: '/dashboard',
        });
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
        cy.assertLink({
          content: 'Events',
          href: '/reports/message-events',
        });

        cy.queryByText('Signals Analytics').click();

        cy.queryByText('Content').click();

        cy.assertLink({
          content: 'Templates',
          href: '/templates',
        });
        cy.assertLink({
          content: 'Snippets',
          href: '/snippets',
        });

        cy.queryByText('Content').click();

        cy.queryByText('Recipients').should('not.be.visible');
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

  describe('The navigation content as a subaccount reporting user', () => {
    beforeEach(() => {
      beforeSteps();
      stubGrantsRequest({ role: 'subaccount-reporting' });
      cy.visit(PAGE_URL);
    });

    it('renders with relevant links', () => {
      cy.get(navigationListSelector).within(() => {
        cy.assertLink({
          content: 'Dashboard',
          href: '/dashboard',
        });
        assertAllSignalsAnalyticsLinks();
        cy.assertLink({
          content: 'Events',
          href: '/reports/message-events',
        });
        cy.queryByText('Content').click();

        cy.assertLink({
          content: 'Templates',
          href: '/templates',
        });
        cy.assertLink({
          content: 'Snippets',
          href: '/snippets',
        });

        cy.queryByText('Content').click();
        cy.queryByText('Recipients').should('not.be.visible');
        cy.queryByText('Alerts').should('not.be.visible');
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

  describe('Feature-flagged navigation items', () => {
    beforeEach(() => beforeSteps());

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

  describe('The navigation on a free plan', () => {
    beforeEach(() => beforeSteps());

    it('renders the "Upgrade Plan" link and Upgrade tag when the users is on the free plan', () => {
      cy.stubRequest({
        url: '/api/v1/account*',
        fixture: 'account/200.get.test-plan.json',
      });

      cy.visit(PAGE_URL);

      cy.get('[data-id="top-nav"]').within(() => {
        cy.assertLink({
          content: 'Upgrade Plan',
          href: '/account/billing/plan',
        });
      });

      openAccountMenu();

      cy.get(accountDropdownListSelector).within(() => {
        cy.queryByText('Billing').should('be.visible');
        cy.queryByText('Upgrade').should('be.visible');
      });
    });
  });
}
