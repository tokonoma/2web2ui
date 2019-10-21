/// <reference types="Cypress" />

/* The Flow:
1. Create a template
2. Write content to each tab and view the preview
3. Save draft
4. Save published
5. Test editor actions in the editor
6. Go to the list view, test editor actions in the list view
*/

const editorSelector = '.ace_text-input';

describe('Templates', () => {
  before(() => {
    cy.server();
    cy.route('POST', '/api/v1/utils/content-previewer').as('contentPreviewer');
    cy.route('POST', '/api/v1/templates/**').as('templatesPost');
    cy.route('PUT', '/api/v1/templates/**').as('templatesPut');
    cy.route('GET', '/api/v1/templates/**').as('templatesGet');
    cy.route('DELETE', '/api/v1/templates/**').as('templatesDelete');

    cy.login();
    cy.get('nav').within(() => {
      cy.findByText('Content').click();
      cy.findByText('Templates').click();
    });
  });

  describe('end-to-end template creation, editing, duplication, and deletion', () => {
    const randomID = Math.floor(Math.random() * 10000); // Helps with test flakiness in the event test data already exists
    const templateTitle = `Cypress Test Template ${randomID}`;

    it('allows creation and editing of a new template', () => {
      cy.findByText('Create New').click();

      cy.title().should('include', 'Create');

      cy.queryByLabelText('Template Name').type(templateTitle);
      cy.queryByLabelText('Subject').type('Cypress Test Template');
      cy.queryByLabelText('From Email').type('nick@');
      cy.contains('nick@').click();
      cy.queryByLabelText('From Email').blur(); // NOTE: Button should not be enabled only via blur - this is a UX problem

      cy.queryByLabelText('From Email').should('have.value', 'nick@bounce.uat.sparkspam.com');
      cy.queryByLabelText('Template ID').should('have.value', `cypress-test-template-${randomID}`);

      cy.findByText('Next').click();

      cy.findByText('Template Created.').should('be.visible');
      cy.title().should('include', 'Edit Template');
      cy.findByText(`${templateTitle} (DRAFT)`).should('be.visible');

      const testPreviewContent = (selector, content) => {
        cy.wait('@contentPreviewer');

        cy.get('iframe')
          .then(($iframe) => {
            const $body = $iframe.contents().find('body');

            cy.wrap($body.find(selector))
              .should('contain', content);
          });
      };

      // HTML editing
      cy.get(editorSelector)
        .focus()
        .type('<h1>This is some HTML. Cypress is {{qualifier}}.', { parseSpecialCharSequences: false }); // See: https://docs.cypress.io/api/commands/type.html#Syntax

      testPreviewContent('h1', 'This is some HTML. Cypress is .');

      // AMP editing
      cy.findByText('AMP HTML').click();

      cy.get(editorSelector)
        .focus()
        .type('<h1>This is some AMP HTML. Cypress is {{qualifier}}.', { parseSpecialCharSequences: false });

      testPreviewContent('h1', 'This is some AMP HTML. Cypress is .');

      // Text editing
      cy.findByText('Text').click();

      cy.get(editorSelector)
        .focus()
        .type('This is some plain text. Cypress is {{qualifier}}.', { parseSpecialCharSequences: false });

      testPreviewContent('p', 'This is some plain text. Cypress is .');

      // Test Data editing
      cy.findByText('Test Data').click();
      const exampleTestData = {
        options: {},
        metadata: {},
        substitution_data: {
          qualifier: 'excelente'
        }
      };
      const altExampleTestData = {
        options: {},
        metadata: {},
        substitution_data: {
          qualifier: 'pretty darn great'
        }
      };

      cy.get(editorSelector)
        .focus()
        .clear()
        .type(JSON.stringify(exampleTestData), { parseSpecialCharSequences: false });

      testPreviewContent('h1', 'This is some HTML. Cypress is excelente.');

      cy.get(editorSelector)
        .focus()
        .clear()
        .type(JSON.stringify(altExampleTestData), { parseSpecialCharSequences: false });

      testPreviewContent('h1', 'This is some HTML. Cypress is pretty darn great.');

      // Saving and publishing the template
      cy.findByText('Save and Publish').click();
      cy.get('#modal-portal').within(() => cy.findByText('Save and Publish').click());

      cy.wait(['@templatesPut','@templatesGet']);

      cy.findByText('Template published').should('be.visible');
      cy.get('#alert-portal').within(() => cy.findAllByRole('button').first().click()); // Close the Snackbar component such that other elements are visible to Cypress

      cy.findByText('Saved').should('be.visible');
      cy.findByText('Unsaved Changes').should('not.be.visible');
      cy.findByText('Edit Draft').should('be.visible');

      cy.findByText('HTML').click();

      // Typing in to editor fields is disabled in published mode
      cy.get(editorSelector)
        .focus()
        .type('<p>Some HTML</p>')
        .should('not.include.value', '<p>Some HTML</p>');

      cy.findByText('Back').click({ force: true }); // `force` param needed for elements targeted with screen reader only content

      cy.findByText(`${templateTitle} (DRAFT)`).should('be.visible');

      // Duplicating a template
      cy.findByText(templateTitle).closest('tr').within(() => {
        cy.findByText('Duplicate Template').click({ force: true });
      });

      cy.findByText('Duplicate').click();

      cy.wait('@templatesGet');
      cy.findByText(`${templateTitle} (COPY)`).should('be.visible');

      // Deleting a template
      cy.findByText(templateTitle).closest('tr').within(() => {
        cy.findByText('Delete Template').click({ force: true });
      });

      cy.findByText('Delete').click();

      cy.wait('@templatesDelete');
      cy.wait('@templatesGet');
      cy.findByText(templateTitle).should('not.be.visible');

      // Cleanup
      cy.findByText(`${templateTitle} (COPY)`).closest('tr').within(() => {
        cy.findByText('Delete Template').click({ force: true });
      });

      cy.findByText('Delete').click();
    });
  });
});
