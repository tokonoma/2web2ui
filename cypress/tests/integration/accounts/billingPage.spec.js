const PAGE_URL = '/account/billing';

describe('Billing Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/billing',
      fixture: 'billing/200.get.json',
      fixtureAlias: 'billingGet',
    });

    cy.stubRequest({
      url: '/api/v1/account/plans',
      fixture: 'account/plans/200.get.json',
      fixtureAlias: 'plansGet',
    });

    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'sending-ips/200.get.json',
      fixtureAlias: 'sendingipsGet',
    });

    cy.stubRequest({
      url: '/api/v1/account/invoices',
      fixture: 'account/invoices/200.get.json',
      fixtureAlias: 'invoicesGet',
    });

    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'usage/200.get.json',
      fixtureAlias: 'usageGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/bundles',
      fixture: 'billing/bundles/200.get.json',
      fixtureAlias: 'bundlesGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/plans',
      fixture: 'billing/plans/200.get.json',
      fixtureAlias: 'billingPlansGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureAlias: 'billingSubscriptionGet',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Billing');
  });

  it("renders with the user's currently selected plan", () => {});

  describe("rendering different plans based on the user's subscription", () => {
    it('renders with the free plan', () => {
      cy.stubRequest({
        url: '/api/v1/billing/subscription',
        fixture: 'billing/subscription/200.get.premier-plan.json',
        fixtureAlias: 'billingSubscriptionGet',
      });

      cy.visit(PAGE_URL);
    });

    it('renders with the 50k/month plan', () => {
      cy.visit(PAGE_URL);

      cy.findByText('50,000 emails for $20 per month').should('be.visible');
      cy.findByText('$1.00 per thousand extra emails').should('be.visible');
    });

    it('renders the premier plan', () => {});
  });

  it('displays a pending plan change banner whenever a plan is downgraded', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.include-pending-subscription.json',
      fixtureAlias: 'accountPendingDowngradeGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.include-pending-downgrades.json',
      fixtureAlias: 'subscriptionPendingDowngradeGet',
    });

    cy.visit(PAGE_URL);

    cy.findByText('Pending Plan Change').should('be.visible');
  });

  it('renders with a link to the change plan page', () => {
    cy.stubRequest({
      url: '/api/v1/account',
      fixture: 'account/200.get.json',
      fixtureAlias: 'accountGet',
    });

    cy.stubRequest({
      url: '/api/v1/billing/subscription',
      fixture: 'billing/subscription/200.get.json',
      fixtureAlias: 'subscriptionGet',
    });

    cy.visit(PAGE_URL);
    cy.findByText('Change Plan').should('have.attr', 'href', '/account/billing/plan');
  });

  describe('the invoice history table', () => {
    function assertTableRow({ rowIndex, date, amount, invoice }) {
      cy.get('tbody tr')
        .eq(rowIndex)
        .within(() => {
          cy.get('td')
            .eq(0)
            .should('contain', date);

          cy.get('td')
            .eq(1)
            .should('contain', amount);

          cy.get('td')
            .eq(2)
            .should('contain', invoice);
        });
    }

    it("renders the user's prior invoices in table rows", () => {
      cy.visit(PAGE_URL);

      cy.findByText('Invoice History')
        .scrollIntoView()
        .should('be.visible');

      assertTableRow({
        rowIndex: 0,
        date: 'Jan 3 2020',
        amount: '$123.00',
        invoice: 'INV123',
      });

      assertTableRow({
        rowIndex: 1,
        date: 'Jan 2 2020',
        amount: '$456.00',
        invoice: 'INV456',
      });

      assertTableRow({
        rowIndex: 2,
        date: 'Jan 1 2020',
        amount: '$789.00',
        invoice: 'INV789',
      });
    });

    it('does not render the "Invoice History" table when no results are returned', () => {
      cy.stubRequest({
        url: '/api/v1/account/invoices',
        fixture: '200.get.no-results',
        fixtureAlias: 'invoicesGet',
      });

      cy.visit(PAGE_URL);

      cy.queryByText('Invoice History').should('not.be.visible');
    });

    it('has a download button in each table row that requests an individual invoice', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Invoice History').scrollIntoView();

      // File download assertion not currently supported, but should be
      // in a future release: https://github.com/cypress-io/cypress/issues/949
      // In the meantime, just checking the request goes through.

      cy.stubRequest({
        url: '/api/v1/account/invoices/abc',
        fixture: 'account/invoices/abc/200.get.pdf',
      });

      cy.get('tbody tr')
        .first()
        .within(() => {
          cy.findByText('Download').click();
        });

      cy.findByText('Downloaded invoice: INV123').should('be.visible');
    });
  });
});
