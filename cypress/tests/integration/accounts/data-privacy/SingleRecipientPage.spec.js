describe('The single recipient data-privacy page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
    cy.visit('/account/data-privacy/single-recipient');
  });

  it('renders with a relevant page title', () => {
    cy.title().should('include', 'Data and Privacy');
  });

  it('renders the single recipient tab', () => {
    cy.findByText('Single Recipient').should('be.visible');
  });

  it('renders a success snackbar when request is submitted correctly', () => {
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/data-privacy/rtbf-request',
      fixture: 'data-privacy/200.post.json',
    });
    cy.get('[value="rtbf"]').check({ force: true });
    cy.findByLabelText('Email Address').type('myfakeusername@sparkpost.com');
    cy.findByText('Submit Request').click();
    cy.findAllByText('Request Saved').should('be.visible');
  });

  it('renders a error snackbar when request is not submitted correctly', () => {
    cy.stubRequest({
      method: 'POST',
      statusCode: 400,
      url: '/api/v1/data-privacy/rtbf-request',
      fixture: 'data-privacy/400.post.json',
    });
    cy.get('[value="rtbf"]').check({ force: true });
    cy.findByLabelText('Email Address').type('myfakeusername@sparkpost.com');
    cy.findByText('Submit Request').click();
    cy.findAllByText('Something went wrong.').should('be.visible');
  });
});
