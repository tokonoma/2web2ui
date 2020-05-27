const PAGE_URL = '/account/billing';
const ACCOUNT_API_BASE_URL = '/api/v1/account';
const BILLING_API_BASE_URL = '/api/v1/billing';

describe('Billing Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: BILLING_API_BASE_URL,
      fixture: 'billing/200.get.json',
      fixtureAlias: 'billingGet',
    });

    cy.stubRequest({
      url: `${ACCOUNT_API_BASE_URL}/plans`,
      fixture: 'account/plans/200.get.json',
      fixtureAlias: 'plansGet',
    });

    cy.stubRequest({
      url: '/api/v1/sending-ips',
      fixture: 'sending-ips/200.get.json',
      fixtureAlias: 'sendingipsGet',
    });

    cy.stubRequest({
      url: `${BILLING_API_BASE_URL}/invoices`,
      fixture: 'billing/invoices/200.get.json',
      fixtureAlias: 'invoicesGet',
    });

    cy.stubRequest({
      url: '/api/v1/usage',
      fixture: 'usage/200.get.json',
      fixtureAlias: 'usageGet',
    });

    cy.stubRequest({
      url: `${BILLING_API_BASE_URL}/bundles`,
      fixture: 'billing/bundles/200.get.json',
      fixtureAlias: 'bundlesGet',
    });

    cy.stubRequest({
      url: `${BILLING_API_BASE_URL}/plans`,
      fixture: 'billing/plans/200.get.json',
      fixtureAlias: 'billingPlansGet',
    });

    cy.stubRequest({
      url: `${BILLING_API_BASE_URL}/subscription`,
      fixture: 'billing/subscription/200.get.json',
      fixtureAlias: 'billingSubscriptionGet',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Billing');
  });

  it("renders with the user's currently selected plan", () => {
    cy.visit(PAGE_URL);

    cy.findByText('50,000 emails for $20 per month').should('be.visible');
    cy.findByText('$1.00 per thousand extra emails').should('be.visible');
  });

  it('opens a modal when clicking "How was this calculated?" breaking down Recipient Validation costs', () => {
    cy.visit(PAGE_URL);

    cy.findByText('How was this calculated?').click();

    cy.findAllByText('How was this calculated?').should('have.length', 2); // The content appears both in the modal triggering element and inside the modal
  });

  it('displays a pending plan change banner whenever a plan is downgraded and no longer displays the "Change Plan" link', () => {
    cy.stubRequest({
      url: `${ACCOUNT_API_BASE_URL}`,
      fixture: 'account/200.get.include-pending-subscription.json',
      fixtureAlias: 'accountPendingDowngradeGet',
    });

    cy.stubRequest({
      url: `${BILLING_API_BASE_URL}/subscription`,
      fixture: 'billing/subscription/200.get.include-pending-downgrades.json',
      fixtureAlias: 'subscriptionPendingDowngradeGet',
    });

    cy.visit(PAGE_URL);

    cy.findByText('Pending Plan Change').should('be.visible');
    cy.queryByText('Change Plan').should('not.be.visible');
  });

  it('renders with a link to the change plan page', () => {
    cy.visit(PAGE_URL);

    cy.verifyLink({ content: 'Change Plan', href: '/account/billing/plan' });
  });

  it('renders with the dedicated IPs section if the user is able to purchase IPs', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Dedicated IPs').should('be.visible');
    cy.verifyLink({ content: 'Manage Your IPs', href: '/account/ip-pools' });
  });

  it('does not render the dedicated IPs section if the user is unable to purchase IPs', () => {
    cy.stubRequest({
      url: ACCOUNT_API_BASE_URL,
      fixture: 'account/200.get.cannot-purchase-ips.json',
    });

    cy.visit(PAGE_URL);

    cy.queryByText('Dedicated IPs').should('not.be.visible');
  });

  it('renders the manually billed transition banner when the user\'s subscription type is not "active", "inactive", or "none"', () => {
    cy.stubRequest({
      url: `${BILLING_API_BASE_URL}/subscription`,
      fixture: 'billing/subscription/200.get.manually-billed.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('Your current 100K Premier plan includes 50,000 emails per month').should(
      'be.visible',
    );
    cy.findByText('Enable automatic billing to self-manage your plan and add-ons.').should(
      'be.visible',
    );
    cy.verifyLink({
      content: 'Enable Automatic Billing',
      href: '/account/billing/enable-automatic',
    });
  });

  it('renders the suspended account banner when the user\'s account type is "suspended" along with the update payment information form', () => {
    cy.stubRequest({
      url: ACCOUNT_API_BASE_URL,
      fixture: 'account/200.get.suspended.json',
    });

    cy.stubRequest({
      url: '/api/v1/account/countries*',
      fixture: 'account/countries/200.get.billing-filter.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('Your account is currently suspended due to a billing problem.').should(
      'be.visible',
    );
    cy.verifyLink({ content: 'visit the billing page', href: '/account/billing' });
    cy.findAllByText('Update Payment Information').should('be.visible');
    cy.findByText('Plan Overview').should('not.be.visible');
    cy.findByLabelText('Credit Card Number').should('be.visible');
    cy.findByLabelText('Cardholder Name').should('be.visible');
    cy.findByLabelText('Expiration Date').should('be.visible');
    cy.findByLabelText('Security Code').should('be.visible');
    cy.findByLabelText('Country').should('be.visible');
    cy.findByLabelText('State').should('be.visible');
    cy.findByLabelText('Zip Code').should('be.visible');
  });

  describe('the dedicated IPs modal', () => {
    const ipPoolsApiUrl = '/api/v1/ip-pools';
    const dedicatedIpsApiUrl = `${ACCOUNT_API_BASE_URL}/add-ons/dedicated_ips`;

    function assignToNewIpPool() {
      cy.findByLabelText(/Quantity */i).type('1'); // Helps avoid encountering the 'Required' error message
      cy.findByLabelText(/Name your new IP Pool */i).type('myPool');
      cy.findAllByText('Add Dedicated IPs')
        .last()
        .click();
    }

    function assignToExistingIpPool() {
      cy.findByLabelText(/Quantity */i).type('1'); // Helps avoid encountering the 'Required' error message
      cy.findByLabelText('Assign to an existing IP Pool').check({ force: true }); // `force` required to handle Matchbox design issue
      cy.findByLabelText(/Choose an IP Pool */i).select('myPool');
      cy.findAllByText('Add Dedicated IPs')
        .last()
        .click();
    }

    beforeEach(() => {
      cy.visit(PAGE_URL);

      cy.stubRequest({
        url: ipPoolsApiUrl,
        fixture: 'ip-pools/200.get.json',
      });

      cy.stubRequest({
        method: 'POST',
        url: ipPoolsApiUrl,
        fixture: 'ip-pools/200.post.json',
      });

      cy.stubRequest({
        method: 'POST',
        url: dedicatedIpsApiUrl,
        fixture: 'account/add-ons/dedicated_ips/200.post.json',
      });

      // Start by opening the modal!
      cy.findByText('Add Dedicated IPs').click();
    });

    it('renders "Required" validation messages when the "Quantity" and "Name your new IP Pool" fields are skipped', () => {
      cy.findAllByText('Add Dedicated IPs')
        .last()
        .click();

      cy.findAllByText('Required').should('have.length', 2);
    });

    it('successfully assigns a dedicated IP to a new IP pool', () => {
      assignToNewIpPool();

      cy.findByText('Successfully added 1 dedicated IPs!');
    });

    it('renders errors when the IP pools API returns an error', () => {
      cy.stubRequest({
        statusCode: 400,
        method: 'POST',
        url: ipPoolsApiUrl,
        fixture: '400.json',
      });

      assignToNewIpPool();

      cy.findByText('Unable to create your new IP Pool').should('be.visible');
      cy.findByText('Something went wrong.').should('be.visible');
    });

    it('renders errors when the dedicated IPs API returns an error', () => {
      cy.stubRequest({
        statusCode: 400,
        method: 'POST',
        url: dedicatedIpsApiUrl,
        fixture: '400.json',
      });

      assignToNewIpPool();

      cy.findByText('Unable to complete your request at this time').should('be.visible');
      cy.findByText('Something went wrong.').should('be.visible');
    });

    it('successfully assigns a dedicated IP to an existing IP pool', () => {
      assignToExistingIpPool();

      cy.findByText('Successfully added 1 dedicated IPs!').should('be.visible');
    });
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
          url: `${ACCOUNT_API_BASE_URL}/countries*`,
          fixture: 'account/countries/200.get.billing-filter.json',
        });

        cy.visit(PAGE_URL);
        cy.findByText(/Update Payment Information */i).click();
      });

      it('closes the modal when clicking "Cancel"', () => {
        cy.findByLabelText('Credit Card Number').should('be.visible');

        cy.findByText('Cancel').click();

        cy.queryByLabelText('Credit Card Number').should('not.be.visible');
      });

      it('renders "Required" validation errors when skipping the "Credit Card Number", "Cardholder Name", "Expiration Date", "Security Code", and "Zip Code" fields', () => {
        cy.findAllByText(/Update Payment Information */i)
          .last()
          .click();

        cy.findAllByText('Required').should('have.length', 5);
      });

      it('renders a success message when successfully updating payment information', () => {
        fillOutForm();

        cy.stubRequest({
          method: 'POST',
          url: `${BILLING_API_BASE_URL}/cors-data*`,
          fixture: 'billing/cors-data/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: '/v1/payment-methods/credit-cards',
          fixture: 'zuora/payment-method/credit-cards/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: `${ACCOUNT_API_BASE_URL}/subscription/check`,
          fixture: 'account/subscription/check/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: `${BILLING_API_BASE_URL}/subscription/check`,
          fixture: 'billing/subscription/check/200.post.json',
        });

        cy.stubRequest({
          method: 'POST',
          url: `${BILLING_API_BASE_URL}/collect`,
          fixture: 'billing/collect/200.post.json',
        });

        cy.findAllByText(/Update Payment Information */i)
          .last()
          .click();

        cy.findByText('Payment Information Updated').should('be.visible');
        cy.queryByLabelText('Credit Card Number').should('not.be.visible'); // The modal should now be closed
      });

      it('renders an error when the server returns an error when updating payment information', () => {
        cy.stubRequest({
          method: 'POST',
          statusCode: 400,
          url: `${BILLING_API_BASE_URL}/cors-data*`,
          fixture: 'billing/cors-data/400.post.json',
        });

        fillOutForm();

        cy.findAllByText(/Update Payment Information */i)
          .last()
          .click();

        cy.findByText('Something went wrong.').should('be.visible');
        cy.findByText('View Details').click();
        cy.findByText('This is an error').should('be.visible');
      });
      describe('reports error to sentry', () => {
        it('sends zuora error codes to sentry when zuora errors with 200', () => {
          cy.stubRequest({
            method: 'POST',
            url: `${BILLING_API_BASE_URL}/cors-data*`,
            fixture: 'billing/cors-data/200.post.json',
          });

          cy.stubRequest({
            method: 'POST',
            url: '/v1/payment-methods/credit-cards',
            fixture: 'zuora/payment-method/credit-cards/200.post.with-error.json',
          });

          cy.stubRequest({
            method: 'POST',
            url: `${ACCOUNT_API_BASE_URL}/subscription/check`,
            fixture: 'account/subscription/check/200.post.json',
          });

          cy.stubRequest({
            method: 'POST',
            url: `${BILLING_API_BASE_URL}/subscription/check`,
            fixture: 'billing/subscription/check/200.post.json',
          });

          cy.stubRequest({
            method: 'POST',
            statusCode: 400,
            url: `${BILLING_API_BASE_URL}/collect`,
            fixture: 'billing/collect/400.post.json',
          });

          fillOutForm();
          cy.findAllByText(/Update Payment Information */i)
            .last()
            .click();
          cy.findByText('Something went wrong.').should('be.visible');
        });

        it('reports error to sentry when zuora errors with 4xx or 5xx', () => {
          cy.stubRequest({
            method: 'POST',
            url: `${BILLING_API_BASE_URL}/cors-data*`,
            fixture: 'billing/cors-data/200.post.json',
          });

          cy.stubRequest({
            method: 'POST',
            statusCode: 400,
            url: '/v1/payment-methods/credit-cards',
            fixture: 'zuora/payment-method/credit-cards/400.post.json',
          });

          cy.stubRequest({
            method: 'POST',
            url: `${ACCOUNT_API_BASE_URL}/subscription/check`,
            fixture: 'account/subscription/check/200.post.json',
          });

          cy.stubRequest({
            method: 'POST',
            url: `${BILLING_API_BASE_URL}/subscription/check`,
            fixture: 'billing/subscription/check/200.post.json',
          });

          cy.stubRequest({
            method: 'POST',
            statusCode: 400,
            url: `${BILLING_API_BASE_URL}/collect`,
            fixture: 'billing/collect/400.post.json',
          });

          fillOutForm();
          cy.findAllByText(/Update Payment Information */i)
            .last()
            .click();
          cy.findByText('An error occurred while contacting zuora').should('be.visible');
        });
      });
    });

    describe('the update billing contact form', () => {
      beforeEach(() => {
        cy.stubRequest({
          url: `${ACCOUNT_API_BASE_URL}/countries*`,
          fixture: 'account/countries/200.get.billing-filter.json',
        });

        cy.visit(PAGE_URL);
        cy.findByText('Update Billing Contact').click();
      });

      it('closes the modal when clicking "Cancel"', () => {
        cy.findByLabelText('First Name').should('be.visible');

        cy.findByText('Cancel').click();

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

        cy.findAllByText('Update Billing Contact')
          .last()
          .click();

        cy.findAllByText('Required').should('have.length', 4);
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
          url: `${ACCOUNT_API_BASE_URL}/billing`,
          fixture: 'billing/200.put.json',
          requestAlias: 'billingUpdate',
        });

        cy.findAllByText('Update Billing Contact')
          .last()
          .click();

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
          url: `${ACCOUNT_API_BASE_URL}/billing`,
          fixture: '400.json',
        });

        cy.findAllByText('Update Billing Contact')
          .last()
          .click();

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
        url: `${BILLING_API_BASE_URL}/invoices`,
        fixture: '200.get.no-results',
        fixtureAlias: 'invoicesGet',
      });

      cy.visit(PAGE_URL);

      cy.queryByText('Invoice History').should('not.be.visible');
    });

    it('does not render the "Invoice History" table when the server returns an error', () => {
      cy.stubRequest({
        status: 400,
        url: `${BILLING_API_BASE_URL}/invoices`,
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
        url: `${BILLING_API_BASE_URL}/invoices/abc`,
        fixture: 'billing/invoices/abc/200.get.pdf',
      });

      cy.get('tbody tr')
        .first()
        .within(() => {
          cy.findByText('Download').click();
        });

      cy.findByText('Downloaded invoice: INV123').should('be.visible');
    });
  });

  it('renders with a "Premium Addon Plan" banner with a "Contact Us" link', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Premium Addon Plan')
      .scrollIntoView()
      .should('be.visible');
    cy.findAllByText('Contact Us')
      .first()
      .should('have.attr', 'href', 'https://www.sparkpost.com/contact-premium');
  });

  it('renders with an "Enterprise" banner with a "Contact Us" link', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Enterprise')
      .scrollIntoView()
      .should('be.visible');
    cy.findAllByText('Contact Us')
      .last()
      .should('have.attr', 'href', 'https://www.sparkpost.com/contact-enterprise');
  });
});
