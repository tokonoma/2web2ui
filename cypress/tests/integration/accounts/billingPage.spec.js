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

  describe('the billing panel', () => {
    it("renders with the user's current active credit card", () => {
      cy.visit(PAGE_URL);

      cy.get('[data-id="billing-panel"]').within(() => {
        cy.findByText('Visa ···· 1111').should('be.visible');
        cy.findByText('Expires 9/2099').should('be.visible');
      });
    });

    it('renders with the current billing contact', () => {
      cy.visit(PAGE_URL);

      cy.get('[data-id="billing-panel"').within(() => {
        cy.findByText('Test User').should('be.visible');
        cy.findByText('test.user@sparkpost.com').should('be.visible');
      });
    });

    describe('the update payment information form', () => {
      function fillOutForm() {
        cy.findByLabelText('Credit Card Number').type('4111 1111 1111 1111');
        cy.findByLabelText('Cardholder Name').type('Hello World');
        cy.findByLabelText('Expiration Date').type('0123');
        cy.findByLabelText('Security Code').type('123');
        cy.findByLabelText('State').select('Maryland');
        cy.findByLabelText('Zip Code').type('21046');
      }

      beforeEach(() => {
        cy.stubRequest({
          url: '/api/v1/account/countries*',
          fixture: 'account/countries/200.get.billing-filter.json',
        });

        cy.visit(PAGE_URL);
        cy.findByText('Update Payment Information').click();
      });

      it('closes the modal when clicking "Cancel"', () => {
        cy.findByLabelText('Credit Card Number').should('be.visible');

        cy.findByText('Cancel').click();

        cy.queryByLabelText('Credit Card Number').should('not.be.visible');
      });

      it('renders "Required" validation errors when skipping the "Credit Card Number", "Cardholder Name", "Expiration Date", "Security Code", and "Zip Code" fields', () => {
        cy.get('#modal-portal').within(() => {
          cy.findAllByText('Update Payment Information')
            .last()
            .click();

          cy.findAllByText('Required').should('have.length', 5);
        });
      });

      it('renders a success message when successfully updating payment information', () => {
        fillOutForm();

        cy.stubRequest({
          method: 'POST',
          url: '/api/v1/billing/cors-data*',
          fixture: 'billing/cors-data/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: '/v1/payment-methods/credit-cards',
          fixture: 'zuora/payment-method/credit-cards/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: '/api/v1/account/subscription/check',
          fixture: 'account/subscription/check/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: '/api/v1/billing/subscription/check',
          fixture: 'billing/subscription/check/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: '/api/v1/account/billing/collect',
          fixture: 'account/billing/collect/200.post.json',
        });

        cy.get('#modal-portal').within(() => {
          cy.findAllByText('Update Payment Information')
            .last()
            .click();
        });

        cy.findByText('Payment Information Updated').should('be.visible');
        cy.queryByLabelText('Credit Card Number').should('not.be.visible'); // The modal should now be closed
      });

      it('renders an error when the server returns an error when updating payment information', () => {
        cy.stubRequest({
          method: 'POST',
          statusCode: 400,
          url: '/api/v1/billing/cors-data*',
          fixture: 'billing/cors-data/400.post.json',
        });

        fillOutForm();

        cy.get('#modal-portal').within(() => {
          cy.findAllByText('Update Payment Information')
            .last()
            .click();
        });

        cy.findByText('Something went wrong.').should('be.visible');
        cy.findByText('View Details').click();
        cy.findByText('This is an error').should('be.visible');
      });
    });

    describe('the update billing contact form', () => {
      beforeEach(() => {
        cy.stubRequest({
          url: '/api/v1/account/countries*',
          fixture: 'account/countries/200.get.billing-filter.json',
        });

        cy.visit(PAGE_URL);
        cy.findByText('Update Billing Contact').click();
      });

      it('closes the modal when clicking "Cancel"', () => {
        cy.findByLabelText('First Name').should('be.visible');

        cy.get('#modal-portal').within(() => {
          cy.findByText('Cancel').click();
        });

        cy.queryByLabelText('First Name').should('not.be.visible');
      });

      it('renders each field with the current billing contact information', () => {
        cy.findByLabelText('First Name').should('have.value', 'Test');
        cy.findByLabelText('Last Name').should('have.value', 'User');
        cy.findByLabelText('Email').should('have.value', 'test.user@sparkpost.com');
        cy.findByLabelText('Zip Code').should('have.value', '20740');
      });

      it('renders "Required" validation errors when skipping any of the form fields', () => {
        cy.findByLabelText('First Name').clear();
        cy.findByLabelText('Last Name').clear();
        cy.findByLabelText('Email').clear();
        cy.findByLabelText('Zip Code').clear();

        cy.get('#modal-portal').within(() => {
          cy.findAllByText('Update Billing Contact')
            .last()
            .click();

          cy.findAllByText('Required').should('have.length', 4);
        });
      });

      it('renders a success message when successfully updating the billing contact', () => {
        cy.findByLabelText('First Name')
          .clear()
          .type('Hello');
        cy.findByLabelText('Last Name')
          .clear()
          .type('World');
        cy.findByLabelText('Email')
          .clear()
          .type('hello.world@sparkpost.com');
        cy.findByLabelText('Country').select('United States');
        cy.findByLabelText('State').select('North Carolina');
        cy.findByLabelText('Zip Code')
          .clear()
          .type('123456');

        cy.stubRequest({
          method: 'PUT',
          url: '/api/v1/account/billing',
          fixture: 'billing/200.put.json',
          requestAlias: 'billingUpdate',
        });

        cy.get('#modal-portal').within(() => {
          cy.findAllByText('Update Billing Contact')
            .last()
            .click();
        });

        cy.wait('@billingUpdate').then(({ request }) => {
          cy.wrap(request.body).should('have.property', 'country_code', 'US');
          cy.wrap(request.body).should('have.property', 'email', 'hello.world@sparkpost.com');
          cy.wrap(request.body).should('have.property', 'first_name', 'Hello');
          cy.wrap(request.body).should('have.property', 'last_name', 'World');
          cy.wrap(request.body).should('have.property', 'state', 'NC');
          cy.wrap(request.body).should('have.property', 'zip_code', '123456');
        });
        cy.findByText('Billing Contact Updated').should('be.visible');
        cy.findByLabelText('First Name').should('not.be.visible'); // The modal is closed'
      });

      it('renders an error message when the server returns an error', () => {
        cy.stubRequest({
          method: 'PUT',
          statusCode: 400,
          url: '/api/v1/account/billing',
          fixture: '400.json',
        });

        cy.get('#modal-portal').within(() => {
          cy.findAllByText('Update Billing Contact')
            .last()
            .click();
        });

        cy.findByText('Something went wrong.').should('be.visible');
        cy.findByText('View Details').click();
        cy.findByText('This is an error').should('be.visible');
      });
    });
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

    it('does not render the "Invoice History" table when the server returns an error', () => {
      cy.stubRequest({
        status: 400,
        url: '/api/v1/account/invoices',
        fixture: '400.json',
      });

      cy.visit(PAGE_URL);

      cy.queryByText('Invoice History').should('not.be.visible');
    });

    it('has a download button in each table row that requests an individual invoice', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Invoice History').scrollIntoView();

      // File download assertion not currently supported, but should be
      // in a future Cypress release: https://github.com/cypress-io/cypress/issues/949
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
