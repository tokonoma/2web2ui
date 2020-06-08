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
      url: '/api/v1/users/mockuser/two-factor',
      fixture: 'users/two-factor/200.get.json',
      fixtureAlias: 'twoFactorGet',
    });
  });
  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);
    cy.title().should('include', 'Account settings');
  });

  describe('Single Sign On Panel', () => {
    describe('SCIM Token Section', () => {
      describe('generate token flow', () => {
        describe('when no prior token is present', () => {
          beforeEach(() => {
            cy.stubRequest({
              url: 'api/v1/api-keys?grant=scim/manage',
              fixture: 'api-keys/200.get-scim-token-notoken.json',
              fixtureAlias: 'oldScimTokenGet',
            });
            cy.visit(PAGE_URL);
          });
          it('renders correct message when no prior scim token is present', () => {
            cy.findByText('No token generated').should('be.visible');
          });
          it('opens Generate SCIM token Modal when a token is not present and clicking on Continue dismisses the Modal and new token can be found', () => {
            cy.stubRequest({
              method: 'POST',
              url: 'api/v1/api-keys',
              fixture: 'api-keys/200.post.json',
              fixtureAlias: 'scimTokenCreate',
            });
            cy.stubRequest({
              url: 'api/v1/api-keys?grant=scim/manage',
              fixture: 'api-keys/200.get-scim-token-newtoken.json',
              fixtureAlias: 'newScimTokenGet',
            });
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(1000);
            cy.findByText('Generate SCIM Token').click();
            cy.withinModal(() => {
              cy.findByText('Generate SCIM Token').should('be.visible');
              cy.findByText('Make sure to copy your SCIM token now.').should('be.visible');
              cy.findByText('Continue').click();
            });
            cy.findByText('123f••••••••').should('be.visible');
            cy.findByText('Delete Token').should('be.visible');
          });
        });
        describe('when a token is already present', () => {
          beforeEach(() => {
            cy.stubRequest({
              url: 'api/v1/api-keys?grant=scim/manage',
              fixture: 'api-keys/200.get-scim-token.json',
              fixtureAlias: 'scimTokenGet',
            });
            cy.visit(PAGE_URL);
          });
          it('renders shortkey for already existing skim token', () => {
            cy.findByText('old1••••••••').should('be.visible');
          });
          it('opens Override SCIM token Modal when a token is already present and clicking on Generate New Token opens Generate SCIM token Modal and clicking on Continue dismisses the Modal and new token can be found', () => {
            cy.findByText('old1••••••••').should('be.visible');
            cy.findByText('Generate SCIM Token').click();
            cy.stubRequest({
              method: 'POST',
              url: 'api/v1/api-keys',
              fixture: 'api-keys/200.post.json',
              fixtureAlias: 'scimTokenCreate',
            });
            cy.stubRequest({
              url: 'api/v1/api-keys?grant=scim/manage',
              fixture: 'api-keys/200.get-scim-token-newtoken.json',
              fixtureAlias: 'newScimTokenGet',
            });
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(1000);
            cy.withinModal(() => {
              cy.findByText('Override Your Current Token?').should('be.visible');
              cy.findByText('Generate New Token').click();
              cy.findByText('Continue').click();
            });
            cy.findByText('123f••••••••').should('be.visible');
          });
        });
      });
    });
  });
});
