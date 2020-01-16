/// <reference types="Cypress" />

const templateId = 'stubbed-template-1';
const editorSelector = '.ace_text-input';
const PAGE_URL = `/templates/edit/${templateId}/draft/content`;

function openTemplateSettings() {
  cy.findByText('Open Menu').click({ force: true }); // The content is visually hidden (intentionally!), so `force: true` is needed here
}

describe('The templates edit draft page', () => {
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
      url: '/api/v1/templates/stubbed-template-1',
      fixture: 'templates/stubbed-template-1/200.get.json',
    });

    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/utils/content-previewer',
      fixture: 'utils/content-previewer/200.post.json',
    });
  });

  it('renders the template title with "(DRAFT)"', () => {
    cy.visit(PAGE_URL);

    cy.findByText('Stubbed Template 1 (DRAFT)');
  });

  it('renders the status in the header as "DRAFT"', () => {
    cy.visit(PAGE_URL);

    cy.get('[data-id="template-status"]').within(() => {
      cy.queryByText('Draft').should('be.visible'); // Note - content is capitalized with CSS, so the markup is not "DRAFT"
    });
  });

  describe('template settings', () => {
    it('renders form elements with pre-populated values', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Template Settings').click();

      cy.findByLabelText('Template Name').should('have.value', 'Stubbed Template 1');
      cy.findByLabelText('Template ID').should('have.value', 'stubbed-template-1');
      cy.findByLabelText('Subject').should('have.value', 'Stubbed Template 1');
      cy.findByLabelText('From Email').should('have.value', 'fake-user@bounce.uat.sparkspam.com');

      // NOTE: Using `.findByLabelText` for grabbing the switch isn't working as labels aren't correctly associated with inputs from an HTML POV
      // Additionally, the switch content visibility isn't working as the content isn't actually hidden from the standpoing of Cypress, just ocluded by a decorative
      // element. Ideally when this component is refactored, these tests could be cleaner and less brittle.
      cy.findByText('Track Opens')
        .closest('[data-id="toggle-block"]')
        .within(() => {
          cy.get('input').should('be.checked');
        });

      cy.findByText('Track Clicks')
        .closest('[data-id="toggle-block"]')
        .within(() => {
          cy.get('input').should('be.checked');
        });

      cy.findByText('Transactional')
        .closest('[data-id="toggle-block"]')
        .within(() => {
          cy.get('input').should('not.be.checked');
        });
    });

    it('renders a success message when the user changes a value in the form and then clicks the "Update Settings" button', () => {
      cy.stubRequest({
        method: 'PUT',
        url: '/api/v1/templates/stubbed-template-1',
        fixture: 'templates/stubbed-template-1/200.put.json',
      });

      cy.visit(PAGE_URL);

      cy.findByText('Template Settings').click();

      cy.findByLabelText('Template Name').type('Making Some Changes');

      cy.findByText('Update Settings').click();

      cy.findByText('Template settings updated.').should('be.visible');
    });
  });

  describe('template actions', () => {
    it('renders with a "Save and Publish" button', () => {
      cy.visit(PAGE_URL);

      cy.findByText('Save and Publish').should('be.visible');
    });

    it('renders a popover with "Save and Publish", "Save Draft", "Duplicate", and "Delete" buttons when clicked', () => {
      cy.visit(PAGE_URL);

      cy.findAllByText('Save and Publish').should('have.length', 1);

      openTemplateSettings();

      cy.findAllByText('Save and Publish').should('have.length', 2);
      cy.findByText('Save Draft').should('be.visible');
      cy.findByText('Duplicate').should('be.visible');
      cy.findByText('Delete').should('be.visible');
    });

    describe('"Save and Publish" button', () => {
      it('renders a confirmation modal when clicked', () => {
        cy.visit(PAGE_URL);

        cy.findByText('Save and Publish').click();

        cy.get('#modal-portal').within(() => {
          cy.findByText('Are you sure you want to publish your template?').should('be.visible');
          cy.findByText('Save and Publish').should('be.visible');
          cy.findByText('Cancel').should('be.visible');
        });
      });

      it('redirects to the published view and renders a success message when confirmed', () => {
        cy.visit(PAGE_URL);

        cy.findByText('Save and Publish').click();

        cy.get('#modal-portal').within(() => {
          cy.findAllByText('Save and Publish').click();
        });

        cy.findByText('Template published').should('be.visible');
        cy.url().should('include', 'published');
      });
    });

    describe('"Save Draft" button', () => {
      it('renders a success message when clicked and updates the state of the draft to "Saved"', () => {
        cy.stubRequest({
          method: 'PUT',
          url: '/api/v1/templates/stubbed-template-1',
          fixture: 'templates/stubbed-template-1/200.put.json',
        });

        cy.visit(PAGE_URL);

        openTemplateSettings();

        cy.findByText('Save Draft').click();

        cy.findByText('Draft saved').should('be.visible');
      });

      it('updates the state of the draft to "Saved" after an unsaved change has been made to the template content', () => {
        cy.stubRequest({
          method: 'PUT',
          url: '/api/v1/templates/stubbed-template-1',
          fixture: 'templates/stubbed-template-1/200.put.json',
        });

        cy.visit(PAGE_URL);

        cy.get(editorSelector)
          .focus()
          .type('<h1>Hello, world.</h1>');

        cy.findByText('Unsaved Changes').should('be.visible');

        openTemplateSettings();

        cy.findByText('Save Draft').click();

        cy.findByText('Saved').should('exist'); // Overlapped by the snackbar UI, so we can't use `should.be.visible` here
      });
    });

    describe('"Duplicate" button', () => {
      it('renders a confirmation modal when clicked with default values "<TEMPLATE NAME> (COPY)" and "<template-id>-copy" in their respective fields', () => {
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
          url: `/api/v1/templates/${templateId}`,
          fixture: 'templates/stubbed-template-1/200.delete.json',
        });

        cy.visit(PAGE_URL);

        openTemplateSettings();

        cy.findByText('Delete').click();
        cy.findByText('Delete All Versions').click();

        cy.findByText('Template deleted').should('be.visible');
      });
    });
  });

  describe('code editor', () => {
    it('renders the values of the HTML, AMP HTML, and Text tabs from the stored template', () => {
      cy.visit(PAGE_URL);

      cy.findByText('HTML!').should('be.visible');

      cy.findByText('AMP HTML').click();

      cy.findByText('AMP HTML!').should('be.visible');

      cy.findByText('Text').click();

      cy.findByText('This is some text').should('be.visible');
    });

    it('allows text entry in the HTML, AMP HTML, Text, and Test Data tabs', () => {
      const typeInEditor = content => {
        cy.get(editorSelector)
          .focus()
          .clear()
          .type(content)
          .blur();
      };

      cy.visit(PAGE_URL);

      typeInEditor('<h1>Hello, HTML');

      cy.findByText('Hello, HTML').should('be.visible'); // Can't check for full HTML as the markup is split between several containing `<span>s`

      cy.findByText('AMP HTML').click();

      typeInEditor('<h1>Hello, AMP HTML');

      cy.findByText('Hello, AMP HTML').should('be.visible');

      cy.findByText('Text').click();

      typeInEditor('Hello, text');

      cy.findByText('Hello, text').should('be.visible');

      cy.findByText('Test Data').click();

      typeInEditor('Hello, test data');

      cy.findByText('Hello, test data').should('be.visible');
    });

    describe('the editor actions popover', () => {
      it('renders the insert snippet modal when clicking on the "Insert Snippet" button', () => {
        cy.stubRequest({
          url: '/api/labs/snippets',
          fixture: 'snippets/200.get.json',
        });

        cy.visit(PAGE_URL);

        cy.findByText('More').click({ force: true });

        cy.findByText('Insert Snippet').click();

        cy.findByText('Add a snippet').should('be.visible');

        cy.findByLabelText('Find a Snippet').focus();
        cy.findByText('Snippet 1').should('be.visible');
        cy.findByText('this-is-a-snippet-1').should('be.visible');
        cy.findByText('Snippet 2').should('be.visible');
        cy.findByText('this-is-a-snippet-2').should('be.visible');
        cy.findByText('Snippet 3').should('be.visible');
        cy.findByText('this-is-a-snippet-3').should('be.visible');
        cy.findByLabelText('Find a Snippet')
          .focus()
          .blur();

        cy.findByLabelText('Snippet Code').should(
          'have.value',
          '{{ render_snippet( "example-id" ) }}',
        );

        // Testing the copying behavior prevents Cypress tests from running as it opens a browser confirmation dialog
        // See: https://github.com/cypress-io/cypress/issues/2851
        // cy.findByText('Copy Code').click();
        // cy.findByText('Snippet copied').should('be.visible');
        // cy.findByText('Add a snippet').should('not.be.visible');
      });

      it('renders the "Insert AMP Boilerplate" button when opened', () => {
        cy.visit(PAGE_URL);

        cy.findByText('AMP HTML').click();
        cy.findByText('More').click({ force: true });

        cy.findByText('Insert AMP Boilerplate').should('be.visible');

        cy.findByText('HTML').click();
        cy.findByText('More').click({ force: true });

        cy.findByText('Insert AMP Boilerplate').should('not.be.visible');

        cy.findByText('Text').click();
        cy.findByText('More').click({ force: true });

        cy.findByText('Insert AMP Boilerplate').should('not.be.visible');

        cy.findByText('Test Data').click();
        cy.findByText('More').click({ force: true });

        cy.findByText('Insert AMP Boilerplate').should('not.be.visible');
      });

      it('renders a warning modal when the "Insert AMP Boilerplate" button is clicked, which allows the user to replace the content of the "AMP HTML" tab with the starter boilerplate', () => {
        cy.visit(PAGE_URL);

        cy.findByText('AMP HTML').click();
        cy.findByText('AMP HTML!').should('be.visible');
        cy.findByText('4email').should('not.be.visible');
        cy.findByText('More').click({ force: true });
        cy.findByText('Insert AMP Boilerplate').click();

        cy.findByText('Are you sure you want to insert the AMP Email Boilerplate?').should(
          'be.visible',
        );
        cy.findByText('Insert').click();
        cy.findByText('AMP HTML!').should('not.be.visible');
        cy.findByText('4email').should('be.visible');
      });
    });
  });

  describe('preview panel', () => {
    it('allows the user to toggle between a desktop and mobile preview', () => {
      // cy.visit(PAGE_URL);
      // cy.findByText('Mobile Preview').click({ force: true });
    });

    it("renders the relevant content according to the user's current selected tab", () => {});

    it('prioritizes rendering HTML content over AMP HTML and text when the "Test Data" tab is selected', () => {});

    it('prioritizes rendering AMP HTML content over text when the "Test Data" tab is selected', () => {});

    it('renders text content when neither HTML no AMP HTML content are returned when the "Test Data" tab is selected', () => {});

    it('renders a "Send a Test" button that opens a modal for sending preview emails', () => {});

    it('renders an syntax error with the relevant line number when the custom status code is "3000"', () => {});

    it('renders an error and its description if the custom status code is not "3000"', () => {});
  });
});
