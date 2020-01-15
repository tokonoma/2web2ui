/// <reference types="Cypress" />

const templateId = 'stubbed-template-1';
const APP_URL = `/templates/edit/${templateId}/draft/content`;

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
  });

  it('renders the template title with "(DRAFT)"', () => {
    cy.visit(APP_URL);

    cy.findByText('Stubbed Template 1 (DRAFT)');
  });

  it('renders the status in the header as "DRAFT"', () => {
    cy.visit(APP_URL);

    cy.get('[data-id="template-status"]').within(() => {
      cy.queryByText('Draft').should('be.visible'); // Note - content is capitalized with CSS, so the markup is not "DRAFT"
    });
  });

  describe('template settings', () => {
    it('renders form elements with pre-populated values', () => {
      cy.visit(APP_URL);

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

      cy.visit(APP_URL);

      cy.findByText('Template Settings').click();

      cy.findByLabelText('Template Name').type('Making Some Changes');

      cy.findByText('Update Settings').click();

      cy.findByText('Template settings updated.').should('be.visible');
    });
  });

  describe('template actions', () => {
    it('renders with a "Save and Publish" button', () => {
      cy.visit(APP_URL);

      cy.findByText('Save and Publish').should('be.visible');
    });

    it('renders a popover with "Save and Publish", "Save Draft", "Duplicate", and "Delete" buttons when clicked', () => {
      cy.visit(APP_URL);

      cy.findAllByText('Save and Publish').should('have.length', 1);

      cy.findByText('Open Menu').click({ force: true }); // The content is visually hidden (intentionally!), so `force: true` is needed here

      cy.findAllByText('Save and Publish').should('have.length', 2);
      cy.findByText('Save Draft').should('be.visible');
      cy.findByText('Duplicate').should('be.visible');
      cy.findByText('Delete').should('be.visible');
    });

    describe('"Save and Publish" button', () => {
      it('renders a confirmation modal when clicked', () => {
        cy.visit(APP_URL);

        cy.findByText('Save and Publish').click();

        cy.get('#modal-portal').within(() => {
          cy.findByText('Are you sure you want to publish your template?').should('be.visible');
          cy.findByText('Save and Publish').should('be.visible');
          cy.findByText('Cancel').should('be.visible');
        });
      });

      it('redirects to the published view and renders a success message when confirmed', () => {
        cy.visit(APP_URL);

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

        cy.visit(APP_URL);

        cy.findByText('Open Menu').click({ force: true }); // The content is visually hidden (intentionally!), so `force: true` is needed here

        cy.findByText('Save Draft').click();

        cy.findByText('Draft saved').should('be.visible');
      });

      it('updates the state of the draft to "Saved" after an unsaved change has been made to the template content', () => {});
    });

    describe('"Duplicate" button', () => {
      it('renders a confirmation modal when clicked with default values "<TEMPLATE NAME> (COPY)" and "<template-id>-copy" in their respective fields', () => {});

      it('renders a success message when the user confirms duplication', () => {});
    });

    describe('"Delete" button', () => {
      it('renders a confirmation modal when clicked', () => {});

      it('renders a success message and redirects the user to the list page when the deletion is confirmed', () => {});
    });
  });

  describe('code editor', () => {
    it('allows text entry in the HTML, AMP HTML, Text, and Test Data tabs', () => {});

    it('renders the template preview when the user stops typing in the "HTML" field', () => {});

    it('renders the template preview when the user stops typing in the "AMP HTML" field', () => {});

    it('renders the template preview when the user stops typing in the "Text" field', () => {});

    it('renders the template preview when the user stops typing in the "TestData" field', () => {});

    describe('the editor actions popover', () => {
      it('renders the "Insert Snippet" button when opened', () => {});

      it('renders the insert snippet modal when clicking on the "Insert Snippet" button', () => {});

      it('renders the "Insert AMP Boilerplate" button when opened', () => {});

      it('renders a warning modal when the "Insert AMP Boilerplate" button is clicked, which allows the user to replace the content of the "AMP HTML" tab with the starter boilerplate', () => {});
    });
  });

  describe('preview panel', () => {
    it('allows the user to toggle between a desktop and mobile preview', () => {});

    it("renders the relevant content according to the user's current selected tab", () => {});

    it('prioritizes rendering HTML content over AMP HTML and text when the "Test Data" tab is selected', () => {});

    it('prioritizes rendering AMP HTML content over text when the "Test Data" tab is selected', () => {});

    it('renders text content when neither HTML no AMP HTML content are returned when the "Test Data" tab is selected', () => {});

    it('renders a "Send a Test" button that opens a modal for sending preview emails', () => {});

    it('renders an syntax error with the relevant line number when the custom status code is "3000"', () => {});

    it('renders an error and its description if the custom status code is not "3000"', () => {});
  });
});
