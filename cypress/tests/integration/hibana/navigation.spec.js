describe('the Hibana navigation', () => {
  const desktopNavSelector = '[data-id="desktop-navigation"]';
  const secondaryNavSelector = '[data-id="secondary-navigation"]';
  const mobileNavSelector = '[data-id="mobile-navigation"]';

  function commonBeforeSteps() {
    cy.stubRequest({
      url: '/api/v1/account*',
      fixture: 'account/200.get.has-hibana-theme-controls.json',
    });

    cy.visit('/');

    cy.findByText('Take a Look').click();
  }

  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
  });

  describe('desktop navigation', () => {
    beforeEach(() => {
      cy.viewport(960, 1024);
    });

    it('does not render the mobile navigation at 960px viewport width and above', () => {
      commonBeforeSteps();

      cy.get(mobileNavSelector).should('not.be.visible');
      cy.get(desktopNavSelector).should('be.visible');
    });

    it('renders all primary nav items when on the dashboard', () => {
      commonBeforeSteps();

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
      commonBeforeSteps();

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
      commonBeforeSteps();

      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Events').click();
      });

      cy.url().should('include', '/reports/message-events');

      cy.get(secondaryNavSelector).should('not.be.visible');
    });

    it('routes to the templates page and renders relevant subnav links when "Content" is active', () => {
      commonBeforeSteps();

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
      commonBeforeSteps();

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

    it('routes to the recipient list page when the user does not have Recipient Validation grants when navigating using the "Recipients" nav item', () => {
      cy.stubRequest({
        url: '/api/v1/authenticate/grants*',
        fixture: 'authenticate/grants/200.get.templates.json',
      });

      commonBeforeSteps();

      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Recipients').click();
      });

      cy.url().should('not.include', '/recipient-validation/list');
      cy.url().should('include', '/lists/recipient-lists');
    });

    it('renders the subnav links when subsections within the "Recipient Validation" category when a subroute is visited', () => {
      commonBeforeSteps();

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
      commonBeforeSteps();

      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Inbox Placement').click();
      });

      cy.url().should('include', '/inbox-placement');

      cy.get(secondaryNavSelector).should('not.be.visible');
    });

    it('does not render the subnav when "Blacklist" is active', () => {
      commonBeforeSteps();

      cy.get(desktopNavSelector).within(() => {
        cy.findByText('Blacklist').click();
      });

      cy.url().should('include', '/blacklist/incidents');

      cy.get(secondaryNavSelector).should('not.be.visible');
    });

    it("renders the pending cancellation banner when the user's account is pending cancellation", () => {
      cy.stubAuth();

      cy.stubRequest({
        url: '/api/v1/account*',
        fixture: 'account/200.get.pending-cancellation.json',
      });

      cy.login({ isStubbed: true });
      cy.visit('/account/settings'); // Re-routing to this page successfully renders the banner
      cy.findByText('Take a Look').click();

      cy.stubRequest({
        method: 'DELETE',
        url: '/api/v1/account/cancellation-request',
        fixture: 'account/cancellation-request/200.delete.json',
      });

      cy.findByText("Don't Cancel").click();
      cy.findByText('Your account will not be cancelled.').should('be.visible');
    });
  });

  describe('mobile navigation', () => {
    beforeEach(() => {
      cy.viewport(959, 1024);
      cy.get(mobileNavSelector).scrollIntoView();
    });

    it('does not render the desktop navigation below the 960px viewport width', () => {
      commonBeforeSteps();

      cy.get(desktopNavSelector).should('not.be.visible');
      cy.get(mobileNavSelector).should('be.visible');
    });

    // TODO: Mobile navigation tests will be fleshed out in FE-922
  });
});
