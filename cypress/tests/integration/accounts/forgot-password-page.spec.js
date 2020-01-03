/// <reference types="Cypress" />

describe('The "Reset Your Password" view', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/forgot-password');
    cy.fixture('forgot-password-post.json').then(json => {
      cy.route({
        method: 'POST',
        url: '/api/v1/users/password/forgot',
        response: json,
      });
    });
  });

  it('renders the heading, username or email address field, and reset password button', () => {
    cy.findByText('Reset Your Password').should('be.visible');
    cy.findByLabelText('Username or email address').should('be.visible');
    cy.findByText('Reset Password');
  });

  it('renders a success message when clicking "Reset Password"', () => {
    cy.findByLabelText('Username or email address').type('myfakeusername@sparkpost.com');
    cy.findByText('Reset Password').click();
    cy.findByText(
      'If you have an account with us, please check your email for your password reset instructions.',
    );
    cy.title().should('include', 'Log In');
  });
});
