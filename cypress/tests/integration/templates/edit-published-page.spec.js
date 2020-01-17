// Configuration
const TEMPLATE_ID = 'stubbed-template-1';
const EDITOR_SELECTOR = '.ace_text-input';
const PAGE_URL = `/templates/edit/${TEMPLATE_ID}/published/content`;

function openTemplateSettings() {
  cy.findByText('Open Menu').click({ force: true }); // The content is visually hidden (intentionally!), so `force: true` is needed here
}

describe('The templates published template page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: '/api/v1/sending-domains',
      fixture: 'sending-domains/200.get.json',
    });

    cy.stubRequest({
      url: '/api/v1/subaccounts',
      fixture: 'subaccounts/200.get.json',
    });

    cy.stubRequest({
      url: '/api/v1/templates/stubbed-template-1*',
      fixture: 'templates/stubbed-template-1/200.get.published.json',
    });

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/utils/content-previewer',
      fixture: 'utils/content-previewer/200.post.json',
    });
  });

  it('renders the status in the header as "PUBLISHED"', () => {
    cy.visit(PAGE_URL);

    cy.get('[data-id="template-status"]').within(() => {
      cy.queryByText('Published').should('be.visible'); // Note - content is capitalized with CSS, so the markup is not "DRAFT"
    });
  });

  it('redirects to the list page if the template fails to load', () => {
    cy.stubRequest({
      statusCode: 400,
      url: '/api/v1/templates/stubbed-template-1*',
      fixture: 'templates/stubbed-template-1/400.get.json',
    });

    cy.visit(PAGE_URL);

    cy.findByText('Unable to load template').should('be.visible');
    cy.findByText('Templates').should('be.visible');
    cy.findByText('Stubbed Template 1').should('not.be.visible');
  });

  describe('the code editor in published mode', () => {
    function checkForReadOnly() {
      cy.findByText('Read Only').should('be.visible');
      cy.findByText('More').should('not.be.visible'); // Checks that menu is not available on each tab

      cy.get(EDITOR_SELECTOR)
        .focus()
        .clear()
        .type('Hello, world');

      cy.scrollTo('top');

      cy.findByText('Hello, world').should('not.be.visible');
    }

    it('renders a "Read Only" tag when "HTML" is selected and authoring HTML is impossible', () => {
      cy.visit(PAGE_URL);

      cy.findByText('AMP HTML').click();
      cy.findByText('HTML').click();

      checkForReadOnly();
    });

    it('renders a "Read Only" tag when "AMP HTML" is selected and authoring AMP HTML is impossible', () => {
      cy.visit(PAGE_URL);

      cy.findByText('AMP HTML').click();

      checkForReadOnly();
    });

    it('renders a "Read Only" tag when "Text" is selected and updating text is impossible', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Text').click();

      checkForReadOnly();
    });

    it('does not render a "Read Only" tag when "Test Data" is selected and updating test data is possible', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Test Data').click();

      cy.findByText('Read Only').should('not.be.visible');

      cy.get(EDITOR_SELECTOR)
        .focus()
        .clear()
        .type('Hello, world');

      cy.scrollTo('top');

      cy.findByText('Hello, world').should('be.visible');
    });
  });

  it('the "Edit Draft" button re-routes the user to the draft version of the template on click', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Edit Draft').click();

    cy.url().should('include', 'draft');
    cy.findByText('Stubbed Template 1 (DRAFT)').should('be.visible');
    cy.get('[data-id="template-status"]').within(() => {
      cy.queryByText('Draft').should('be.visible');
    });
  });

  describe('template actions', () => {
    it('renders a popover with "Edit Draft", "Duplicate", and "Delete" buttons when clicked', () => {
      cy.visit(PAGE_URL);

      cy.findAllByText('Edit Draft').should('have.length', 1);

      openTemplateSettings();

      cy.findAllByText('Edit Draft').should('have.length', 2);
      cy.findByText('Duplicate').should('be.visible');
      cy.findByText('Delete').should('be.visible');
    });

    describe('the "Duplicate" button', () => {
      it('has a "Duplicate" button that renders a confirmation when clicked', () => {
        cy.visit(PAGE_URL);

        openTemplateSettings();

        cy.findByText('Duplicate').click();

        cy.findByText('Duplicate Template').should('be.visible');
        cy.findByLabelText('Template Name *').should('have.value', 'Stubbed Template 1 (COPY)');
        cy.findByLabelText('Template ID *').should('have.value', 'stubbed-template-1-copy');
      });

      it('renders a success message when the user confirms duplication', () => {
        cy.stubRequest({
          method: 'POST',
          url: '/api/v1/templates',
          fixture: 'templates/200.post.create.json',
        });

        cy.visit(PAGE_URL);

        openTemplateSettings();

        cy.findByText('Duplicate').click();
        cy.findByText('Duplicate').click(); // Duplicate confirmation button inside the modal

        cy.findByText('Template duplicated.').should('be.visible');
      });

      it('renders an error message if the duplication fails on confirmation', () => {
        cy.stubRequest({
          method: 'POST',
          statusCode: 400,
          url: '/api/v1/templates',
          fixture: 'templates/400.post.create.json',
        });

        cy.visit(PAGE_URL);

        openTemplateSettings();

        cy.findByText('Duplicate').click();
        cy.findByText('Duplicate').click(); // Duplicate confirmation button inside the modal

        cy.findByText('Something went wrong.').should('be.visible');

        // And the UI persists prior to throwing the error
        cy.findByLabelText('Template Name *').should('be.visible');
        cy.findByLabelText('Template ID *').should('be.visible');
      });
    });

    describe('"Delete" button', () => {
      it('renders a confirmation modal when clicked', () => {
        openTemplateSettings();

        cy.findByText('Delete').click();

        cy.findByText('Are you sure you want to delete your template?').should('be.visible');
        cy.findByText('Delete All Versions').should('be.visible');
        cy.findByText('Cancel').should('be.visible');
      });

      it('renders a success message and redirects the user to the list page when the deletion is confirmed', () => {
        cy.stubRequest({
          method: 'DELETE',
          url: `/api/v1/templates/${TEMPLATE_ID}`,
          fixture: 'templates/stubbed-template-1/200.delete.json',
        });

        cy.visit(PAGE_URL);

        openTemplateSettings();

        cy.findByText('Delete').click();
        cy.findByText('Delete All Versions').click();

        cy.findByText('Template deleted').should('be.visible');
      });

      it('renders an error message if the deletion fails on confirmation', () => {
        cy.stubRequest({
          method: 'DELETE',
          statusCode: 400,
          url: `/api/v1/templates/${TEMPLATE_ID}`,
          fixture: 'templates/stubbed-template-1/400.delete.json',
        });

        cy.visit(PAGE_URL);

        openTemplateSettings();

        cy.findByText('Delete').click();
        cy.findByText('Delete All Versions').click();

        cy.findByText('Something went wrong.').should('be.visible');
        cy.findByText('Are you sure you want to delete your template?').should('be.visible'); // The modal remains open
      });
    });
  });

  describe('template settings', () => {
    it('renders all fields as disabled in published mode', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Template Settings').click();

      cy.findByLabelText('Template Name').should('be.disabled');
      cy.findByLabelText('Template ID').should('be.disabled');
      cy.findByLabelText('Subject').should('be.disabled');
      cy.findByLabelText('From Email').should('be.disabled');
      cy.findByLabelText('From Name').should('be.disabled');
      cy.findByLabelText('Reply To').should('be.disabled');
      cy.findByLabelText('Description').should('be.disabled');

      // NOTE: Using `.findByLabelText` for grabbing the switch isn't working as labels aren't correctly associated with inputs from an HTML POV
      // Additionally, the switch content visibility isn't working as the content isn't actually hidden from the standpoing of Cypress, just ocluded by a decorative
      // element. Ideally when this component is refactored, these tests could be cleaner and less brittle.
      cy.findByText('Track Opens')
        .closest('[data-id="toggle-block"]')
        .within(() => {
          cy.get('input').should('be.disabled');
        });

      cy.findByText('Track Clicks')
        .closest('[data-id="toggle-block"]')
        .within(() => {
          cy.get('input').should('be.disabled');
        });

      cy.findByText('Transactional')
        .closest('[data-id="toggle-block"]')
        .within(() => {
          cy.get('input').should('be.disabled');
        });

      cy.findByText('Update Settings').should('be.disabled');
    });
  });
});
