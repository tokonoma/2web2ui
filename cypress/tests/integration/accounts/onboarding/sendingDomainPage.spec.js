describe('The sending domain page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
    cy.visit('/onboarding/sending-domain');
  });

  it('renders with the relevant page title', () => {
    cy.title().should('include', 'Create a Sending Domain');
  });

  it('renders with a link to SparkPost documentation regarding sending domains', () => {
    cy.findByText('Learn more about sending domains').should(
      'have.attr',
      'href',
      'https://www.sparkpost.com/docs/getting-started/getting-started-sparkpost/#preparing-your-from-address',
    );
  });

  it('renders with a link to skip this onboarding step and proceed to dashboard', () => {
    cy.findByText('Skip for now').should('have.attr', 'href', '/dashboard');
  });

  it('shows a "Required" error message if the user attempts to submit the form without endering a domain', () => {
    cy.findByText('Add Domain').click();
    cy.queryByText('Required').should('be.visible');
  });

  it('re-routes the user to the dashboard after successfully adding a domain', () => {
    cy.server();
    cy.fixture('sending-domains/200.post.json').as('sendingDomainsPost');
    cy.route({
      url: '/api/v1/sending-domains',
      method: 'POST',
      response: '@sendingDomainsPost',
    });

    cy.findByLabelText('Domain Name').type('example.com');
    cy.findByText('Add Domain').click();
    cy.title().should('include', 'Dashboard');
  });

  it('shows a snackbar with error message for invalid domain', () => {
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/sending-domains',
      statusCode: 422,
      fixture: 'sending-domains/422.post.json',
      requestAlias: 'sendingDomainPost',
    });

    cy.findByLabelText('Domain Name').type('hello');
    cy.findByText('Add Domain').click();

    cy.wait('@sendingDomainPost');

    cy.findByText('Something went wrong.').should('be.visible');
    cy.findByText('View Details').click();
    cy.findByText(`Error domain name contains no '.'(s) for domain: 'hello'`).should('be.visible');
  });
});
