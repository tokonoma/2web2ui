describe('the Hibana navigation', () => {
  const desktopNavSelector = '[data-id="desktop-navigation"]';
  const secondaryNavSelector = '[data-id="secondary-navigation"]';
  const mobileNavSelector = '[data-id="mobile-navigation"]';

  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/account*',
      fixture: 'account/200.get.has-hibana-theme-controls.json',
    });

    cy.visit('/');

    cy.findByText('Take a Look').click();
  });

  describe('desktop navigation', () => {
    beforeEach(() => {
      cy.viewport(960, 1024);
      cy.get(desktopNavSelector).scrollIntoView();
    });

    it('does not render the mobile navigation at 960px viewport width and above', () => {
      cy.get(mobileNavSelector).should('not.be.visible');
      cy.get(desktopNavSelector).should('be.visible');
    });

    it('renders all primary nav items when on the dashboard', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.assertLink({ content: 'Signals Analytics', href: '/reports' });
        cy.assertLink({ content: 'Events', href: '/reports/message-events' });
        cy.assertLink({ content: 'Content', href: '/templates' });
        cy.assertLink({ content: 'Recipients', href: '/recipient-validation/list' });
        cy.assertLink({ content: 'Inbox Placement', href: '/inbox-placement' });
        cy.assertLink({ content: 'Blacklist', href: '/blacklist/incidents' });
      });
    });

    it('routes to the summary page and renders relevant subnav links when "Signals Analytics" is active', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Signals Analytics').click();
      });

      cy.url().should('include', '/reports/summary');

      cy.get(secondaryNavSelector).within(() => {
        cy.assertLink({ content: 'Summary', href: '/reports/summary' });
        cy.assertLink({ content: 'Bounce', href: '/reports/bounce' });
        cy.assertLink({ content: 'Rejections', href: '/reports/rejections' });
        cy.assertLink({ content: 'Accepted', href: '/reports/accepted' });
        cy.assertLink({ content: 'Delayed', href: '/reports/delayed' });
        cy.assertLink({ content: 'Health Score', href: '/signals/health-score' });
        cy.assertLink({ content: 'Spam Traps', href: '/signals/spam-traps' });
        cy.assertLink({ content: 'Engagement Recency', href: '/signals/engagement' });
      });
    });

    it('does not render the subnav when "Events" is active', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Events').click();
      });

      cy.url().should('include', '/reports/message-events');

      cy.get(secondaryNavSelector).should('not.be.visible');
    });

    it('routes to the templates page and renders relevant subnav links when "Content" is active', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Content').click();
      });

      cy.url().should('include', '/templates');

      cy.get(secondaryNavSelector).within(() => {
        cy.assertLink({ content: 'Templates', href: '/templates' });
        cy.assertLink({ content: 'A/B Testing', href: '/ab-testing' });
        cy.assertLink({ content: 'Snippets', href: '/snippets' });
      });
    });

    it('routes to the recipient validation page and renders relevant subnav links when "Recipients" is active', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Recipients').click();
      });

      cy.url().should('include', '/recipient-validation/list');

      cy.get(secondaryNavSelector).within(() => {
        cy.assertLink({ content: 'Recipient Validation', href: '/recipient-validation/list' });
        cy.assertLink({ content: 'Recipient Lists', href: '/lists/recipient-lists' });
        cy.assertLink({ content: 'Suppressions', href: '/lists/suppressions' });
      });
    });

    it('renders the subnav links when subsections within the "Recipient Validation" page are a', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Recipients').click();
      });

      cy.findByText('Single Address').click();

      cy.get(secondaryNavSelector).within(() => {
        cy.assertLink({ content: 'Recipient Validation', href: '/recipient-validation/list' });
        cy.assertLink({ content: 'Recipient Lists', href: '/lists/recipient-lists' });
        cy.assertLink({ content: 'Suppressions', href: '/lists/suppressions' });
      });
    });

    it('does not render the subnav when "Inbox Placement" is active', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Inbox Placement').click();
      });

      cy.url().should('include', '/inbox-placement');

      cy.get(secondaryNavSelector).should('not.be.visible');
    });

    it('does not render the subnav when "Blacklist" is active', () => {
      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Blacklist').click();
      });

      cy.url().should('include', '/blacklist/incidents');

      cy.get(secondaryNavSelector).should('not.be.visible');
    });
  });

  describe('mobile navigation', () => {
    beforeEach(() => {
      cy.viewport(959, 1024);
      cy.get(mobileNavSelector).scrollIntoView();
    });

    it('does not render the desktop navigation below the 960px viewport width', () => {
      cy.get(desktopNavSelector).should('not.be.visible');
      cy.get(mobileNavSelector).should('be.visible');
    });

    // TODO: Mobile navigation tests will be fleshed out in FE-922
  });
});
