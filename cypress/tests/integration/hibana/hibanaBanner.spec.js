const PAGE_URL = '/';
const API_URL = '/api/v1/account*';

if (Cypress.env('DEFAULT_TO_HIBANA') !== true) {
  // Pulled out of `beforeEach()` as this is needed in most tests, but not all
  function beforeSteps() {
    cy.stubRequest({
      url: API_URL,
      fixture: 'account/200.get.has-hibana-theme-controls.json',
    });

    cy.stubRequest({
      url: 'api/v1/users/mockuser/two-factor',
      fixture: 'users/two-factor/200.get.json',
    });

    cy.stubRequest({
      url: 'api/v1/users/mockuser/two-factor/backup',
      fixture: 'users/two-factor/backup/200.get.json',
    });
  }

  describe('Hibana theme toggling UI', () => {
    beforeEach(() => {
      cy.stubAuth();
      cy.login({ isStubbed: true });
    });

    it('renders the Hibana UI when the user\'s account has the UI flag "hibana.hasThemeControls", but not on the profile page', () => {
      beforeSteps();
      cy.visit(PAGE_URL);

      cy.findByDataId('hibana-controls').should('be.visible');

      cy.visit('/account/profile');

      cy.findByDataId('hibana-controls').should('not.be.visible');
    });

    it('does not render the Hibana UI when the user\'s account has the UI flag "hibana.hasThemeControls" set to `false`', () => {
      beforeSteps();
      cy.stubRequest({
        url: API_URL,
        fixture: 'account/200.get.does-not-have-hibana-theme-controls.json',
      });
      cy.visit(PAGE_URL);

      cy.findByDataId('hibana-controls').should('not.be.visible');
    });

    it('does not render the Hibana UI when the user\'s account lacks the "hibana" UI flag entirely', () => {
      beforeSteps();
      cy.stubRequest({
        url: API_URL,
        fixture: 'account/200.get.no-ui-options.json',
      });
      cy.visit(PAGE_URL);

      cy.findByDataId('hibana-controls').should('not.be.visible');
    });

    it('does not render the Hibana banner if the user UI option "isHibanaBannerVisible" is false', () => {
      cy.stubRequest({
        url: '/api/v1/users/mockuser',
        fixture: 'users/200.get.hibana-banner-is-not-visible.json',
      });

      cy.visit(PAGE_URL);

      cy.findByDataId('hibana-controls').should('not.be.visible');
    });

    it('does not render the UI toggling controls on the profile page when the user\'s account is missing the "hibana" UI flag', () => {
      beforeSteps();
      cy.stubRequest({
        url: API_URL,
        fixture: 'account/200.get.does-not-have-hibana-theme-controls.json',
      });
      cy.visit('/account/profile');

      cy.queryByText('Use Redesigned Version of App').should('not.be.visible');
    });

    it('navigates the user to the profile page and dismisses the banner when clicking "Turn it on!"', () => {
      beforeSteps();
      cy.visit(PAGE_URL);

      if (Cypress.env('DEFAULT_TO_HIBANA') !== true) {
        cy.stubRequest({
          url: 'api/v1/users/mockuser',
          method: 'PUT',
          fixture: 'users/200.put.update-ui-options.json',
          requestAlias: 'updateUIOptions',
        });

        cy.findByDataId('hibana-controls').within(() => {
          cy.findByText('Turn it on!').click();
          cy.wait('@updateUIOptions').then(xhr => {
            expect(xhr.request.body).to.deep.equal({
              options: { ui: { isHibanaBannerVisible: false } },
            });
          });
        });

        cy.findByDataId('hibana-controls').should('not.be.visible');
        cy.url().should('include', '/account/profile');
        cy.title().should('include', 'Profile');
      }
    });

    it('dismisses the banner when the user clicks the dismiss button', () => {
      beforeSteps();
      cy.visit(PAGE_URL);

      if (Cypress.env('DEFAULT_TO_HIBANA') !== true) {
        cy.stubRequest({
          url: 'api/v1/users/mockuser',
          method: 'PUT',
          fixture: 'users/200.put.update-ui-options.json',
          requestAlias: 'updateUIOptions',
        });

        cy.findByDataId('hibana-controls').within(() => {
          cy.findByText('Dismiss').click({ force: true }); // `force` required because this is ScreenReaderOnly content
          cy.wait('@updateUIOptions').then(xhr => {
            expect(xhr.request.body).to.deep.equal({
              options: { ui: { isHibanaBannerVisible: false } },
            });
          });

          cy.findByDataId('hibana-controls').should('not.be.visible');
        });
      }
    });
  });
}
