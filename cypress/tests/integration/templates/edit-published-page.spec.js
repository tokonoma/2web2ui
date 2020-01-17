// Configuration
const TEMPLATE_ID = 'stubbed-template-1';
const EDITOR_SELECTOR = '.ace_text-input';
const PAGE_URL = `/templates/edit/${TEMPLATE_ID}/published/content`;

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

  describe('the editor in published mode', () => {
    function checkForReadOnly() {
      cy.findByText('Read Only').should('be.visible');

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
});
