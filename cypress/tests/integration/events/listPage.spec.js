const PAGE_URL = '/reports/message-events';

describe('The events page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/events/message*',
      fixture: 'events/message/200.get.json',
    });

    cy.stubRequest({
      url: '/api/v1/events/message/documentation',
      fixture: 'events/message/documentation/200.get.json',
    });
  });

  it('has a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Events Search | Events');
    cy.findByText('Events Search').should('be.visible');
  });

  it('renders an error when the request for events documentation data fails', () => {
    cy.stubRequest({
      statusCode: 400,
      url: '/api/v1/events/message/documentation',
      fixture: 'events/message/documentation/400.get.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('An error occurred').should('be.visible');
    cy.findByText('Show Error Details').click();
    cy.findByText('This is an error').should('be.visible');
    cy.findByText('Hide Error Details').click();
    cy.queryByText('This is an error').should('not.be.visible');

    cy.stubRequest({
      url: '/api/v1/events/message/documentation',
      fixture: 'events/message/documentation/200.get.json',
    });

    cy.findByText('Try Again').click();
    cy.queryByText('An error occurred').should('not.be.visible');
  });

  it('renders an error when the request for events data fails', () => {
    cy.stubRequest({
      statusCode: 400,
      url: '/api/v1/events/message*',
      fixture: 'events/message/400.get.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('An error occurred').should('be.visible');
    cy.findByText('Show Error Details').click();
    cy.findByText('This is an error').should('be.visible');
    cy.findByText('Hide Error Details').click();
    cy.queryByText('This is an error').should('not.be.visible');

    cy.stubRequest({
      url: '/api/v1/events/message*',
      fixture: 'events/message/200.get.json',
    });

    cy.findByText('Try Again').click();
    cy.queryByText('An error occurred').should('not.be.visible');
  });

  it('renders the "Share this report" modal when clicking on the "Share" button', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Share').click();

    cy.findByText('Share this report').should('be.visible');
  });

  describe('filtering', () => {
    // TODO: Work on this test once `TR-2133` is merged
    // it('re-requests events data when changing the filter date', () => {
    //   cy.visit(PAGE_URL);
    // });

    it('re-requests events data when the user filters by a recipient email address', () => {
      cy.visit(PAGE_URL);

      cy.stubRequest({
        url: '/api/v1/events/message*',
        fixture: 'events/message/200.get.different-results.json',
        requestAlias: 'eventsRequest',
      });

      cy.findByLabelText('Filter by Recipient Email Address')
        .type('hello@gmail.com')
        .blur();

      cy.wait('@eventsRequest');

      cy.findByText('Recipients: hello@gmail.com').should('be.visible');
      cy.findByText('Clear All Filters').should('be.visible');
      cy.findByText('different-recipient@hotmail.com').should('be.visible'); // The new results are visible...
      cy.queryByText('fake-recipient@hotmail.com').should('not.be.visible'); // ...and the old results are not!
    });

    it('renders an invalid email address in the recipient email address filter when an invalid email is entered', () => {
      cy.visit(PAGE_URL);

      cy.findByLabelText('Filter by Recipient Email Address')
        .type('hello')
        .blur();

      cy.findByText('hello is not a valid email address').should('be.visible');

      cy.findByLabelText('Filter by Recipient Email Address')
        .clear()
        .type('@gmail.com')
        .blur();

      cy.findByText('@gmail.com is not a valid email address').should('be.visible');

      cy.findByLabelText('Filter by Recipient Email Address')
        .clear()
        .type('a@b')
        .blur();

      cy.findByText('a@b is not a valid email address').should('be.visible');

      cy.findByLabelText('Filter by Recipient Email Address')
        .clear()
        .type('a@b.c')
        .blur();

      cy.queryByText('a@b.c is not a valid email address').should('not.be.visible');
    });

    it('re-requests data when removing an active filter and when clicking "Clear All Filters"', () => {
      cy.visit(PAGE_URL);

      cy.stubRequest({
        url: '/api/v1/events/message*',
        fixture: 'events/message/200.get.different-results.json',
      });

      cy.findByLabelText('Filter by Recipient Email Address')
        .type('hello@gmail.com')
        .blur();

      cy.findByText('different-recipient@hotmail.com').should('be.visible');
      cy.queryByText('fake-recipient@hotmail.com').should('not.be.visible');

      cy.stubRequest({
        url: '/api/v1/events/message*',
        fixture: 'events/message/200.get.json',
      });

      cy.findByText('Clear All Filters').click();

      cy.queryByText('fake-recipient@hotmail.com').should('be.visible');
      cy.findByText('different-recipient@hotmail.com').should('not.be.visible');
    });

    describe('the "Advanced Filters" modal', () => {
      const selectLabel = 'Filter By';
      const textFieldLabel = 'Filter';

      beforeEach(() => {
        cy.visit(PAGE_URL);
        cy.findByText('Add Filters').click();
      });

      it('renders documentation about each event type when hovering over a check box label', () => {
        // NOTE: Rendering of these tooltips is a little unusual as Cypress does not have a .hover()
        // that actually simulates user behavior. This means using the `mousover` event actually
        // triggers a technically impossible application state when a real user is in control vs.
        // simulated events
        cy.findByText('Delay').trigger('mouseover');

        cy.findByText('Remote MTA has temporarily rejected a message.').should('be.visible');

        cy.findByText('SMS Status').trigger('mouseover');

        cy.findByText('SMPP/SMS message produced a status log output');
      });

      it('allows the addition and removal of other filters via the "Add Filter" and "Remove" buttons', () => {
        cy.findAllByLabelText(selectLabel).should('have.length', 1);
        cy.findAllByLabelText(textFieldLabel).should('have.length', 1);

        cy.findByText('Add Filter').click();

        cy.findAllByLabelText(selectLabel).should('have.length', 2);
        cy.findAllByLabelText(textFieldLabel).should('have.length', 2);

        cy.findAllByText('Remove')
          .first()
          .click();

        cy.findAllByLabelText(selectLabel).should('have.length', 1);
        cy.findAllByLabelText(textFieldLabel).should('have.length', 1);

        cy.findByText('Remove').click();

        cy.findByLabelText(selectLabel).should('not.be.visible');
        cy.findByLabelText(textFieldLabel).should('not.be.visible');
      });

      it('closes the modal when clicking "Cancel"', () => {
        cy.findByText('Cancel').click();

        cy.findByText('Advanced Filters').should('not.be.visible');
      });

      it('closes the modal and applies filters when clicking "Apply Filters" by re-requesting events data', () => {
        // `force` shouldn't be necessary, but due to component markup it is - Hibana component redesign may make this unnecessary
        cy.findByLabelText('AMP Click').check({ force: true });
        cy.findByLabelText('Out of Band').check({ force: true });
        cy.findByLabelText('Filter By').select('Recipient Domains');
        cy.findByLabelText('Filter').type('gmail.com');
        cy.findByText('Add Filter').click();
        cy.findAllByLabelText('Filter By')
          .last()
          .select('Subjects');
        cy.findAllByLabelText('Filter')
          .last()
          .type('Happy Birthday');

        cy.stubRequest({
          url: '/api/v1/events/message*',
          fixture: 'events/message/200.get.different-results.json',
        });

        cy.findByText('Apply Filters').click();

        cy.findByText('Advanced Filters').should('not.be.visible');
        cy.findByText('Event: Amp Click').should('be.visible');
        cy.findByText('Event: Out Of Band').should('be.visible');
        cy.findByText('Recipient Domains: gmail.com').should('be.visible');
        cy.findByText('Subjects: Happy Birthday').should('be.visible');
        cy.findByText('These are different results').should('be.visible'); // The new results are visible...
        cy.queryByText('fake-recipient@hotmail.com').should('not.be.visible'); // ...and the old results are not!
      });

      it.only('removes all filters when clicking "Clear All Filters"', () => {
        cy.findByLabelText('AMP Click').check({ force: true });
        cy.findByLabelText('Out of Band').check({ force: true });
        cy.findByLabelText('Filter By').select('Recipient Domains');
        cy.findByLabelText('Filter').type('gmail.com');
        cy.findByText('Apply Filters').click();

        cy.findByText('Event: Amp Click').should('be.visible');
        cy.findByText('Event: Out Of Band').should('be.visible');
        cy.findByText('Recipient Domains: gmail.com').should('be.visible');

        cy.findByText('Clear All Filters').click();

        cy.queryByText('Event: Amp Click').should('not.be.visible');
        cy.queryByText('Event: Out Of Band').should('not.be.visible');
        cy.queryByText('Recipient Domains: gmail.com').should('not.be.visible');
      });
    });
  });

  describe('the events table', () => {
    it('renders with a "View Details" button that links to the detail page for this event', () => {
      cy.visit(PAGE_URL);

      cy.findAllByText('View Details')
        .first()
        .should('have.attr', 'href', '/reports/message-events/details/mock-message-id-1/1234');

      cy.findAllByText('View Details')
        .last()
        .should('have.attr', 'href', '/reports/message-events/details/mock-message-id-2/5678');
    });

    it('renders the "Event", "Subject", "Recipient", "From Address", and event "Time" for each event', () => {
      cy.visit(PAGE_URL);

      cy.get('tbody tr')
        .first()
        .within(() => {
          cy.findByText('Mock Subject 1').should('be.visible');
          cy.findByText('fake-recipient@hotmail.com').should('be.visible');
          cy.findByText('fake-sender@hotmail.com').should('be.visible');
          cy.findByText('Injection').should('be.visible');
        });

      cy.get('tbody tr')
        .last()
        .within(() => {
          cy.findByText('Delivery').should('be.visible');
          cy.findByText('Mock Subject 2').should('be.visible');
          cy.findByText('fake-recipient@gmail.com').should('be.visible');
          cy.findByText('fake-sender@hotmail.com').should('be.visible');
        });
    });

    it('renders the empty state when no events are returned', () => {
      cy.stubRequest({
        url: '/api/v1/events/message*',
        fixture: 'events/message/200.get.no-results.json',
      });

      cy.visit(PAGE_URL);

      cy.findByText('There are no message events for your current query').should('be.visible');
      cy.get('table').should('not.be.visible');
    });
  });
});
