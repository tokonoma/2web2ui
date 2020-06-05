const PAGE_URL = '/account/settings';
describe('Account Settings Page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
    cy.stubRequest({
      url: '/api/v1/account/sso/saml',
      fixture: 'account/sso/200.get.saml.json',
      fixtureAlias: 'ssoSamlGet',
    });
    cy.stubRequest({
      url: '/api/v1/api-keys?grant=scim%2Fmanage',
      fixture: 'api-keys/200.get-scim-token.json',
      fixtureAlias: 'scimTokenGet',
    });
    cy.stubRequest({
      url: '/api/v1/users/mockuser/two-factor',
      fixture: 'users/two-factor/200.get.json',
      fixtureAlias: 'twoFactorGet',
    });
  });
  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Account settings');
  });
  describe('SSO Panel', () => {
    describe('SCIM Token', () => {
      it('renders correct message when no prior scim token is present', () => {
        cy.findByText('No token generated').should('be.visible');
      });
      it('opens Generate SCIM token Modal when no prior token is present', () => {
        cy.findByText('Generate SCIM Token').click();
        cy.stubRequest({
          method: 'POST',
          url: '/api/v1/api-keys',
          fixture: 'api-keys/200.post.json',
          fixtureAlias: 'scimTokenCreate',
        });
        cy.withinModal(() => {
          cy.findByText('Generate SCIM Token').should('be.visible');
        });
      });
    });
  });
});
