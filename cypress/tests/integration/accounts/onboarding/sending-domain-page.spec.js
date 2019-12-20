/// <reference types="Cypress" />

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

  it('renders with a link to skip this onboarding step and proceed to email setup', () => {
    cy.findByText('Skip for now').should('have.attr', 'href', '/onboarding/email');
  });

  it('shows a "Required" error message if the user attempts to submit the form without endering a domain', () => {
    cy.findByText('Add Domain').click();
    cy.queryByText('Required').should('be.visible');
  });

  it('shows an "Invalid Domain" error if the user types in a domain name format that is invalid', () => {
    cy.findByLabelText('Domain Name')
      .type('hello')
      .blur();

    cy.queryByText('Invalid Domain').should('be.visible');
  });

  it('re-routes the user to the email sending onboarding step after successfully adding a domain', () => {
    cy.server();
    cy.fixture('sending-domains/200.post.json').as('sendingDomainsPost');
    cy.route({
      url: '/api/v1/sending-domains',
      method: 'POST',
      response: '@sendingDomainsPost',
    });

    cy.findByLabelText('Domain Name').type('example.com');
    cy.findByText('Add Domain').click();
    cy.title().should('include', 'Sending Your First Email');
    cy.findByText('Sending Your First Email').should('be.visible');
  });
});
