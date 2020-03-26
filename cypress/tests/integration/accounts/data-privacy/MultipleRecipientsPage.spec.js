describe('The multi recipients data-privacy page', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });
    cy.visit('/account/data-privacy/multiple-recipients');
  });

  it('renders with a relevant page title', () => {
    cy.title().should('include', 'Data and Privacy');
  });

  it('renders the tab', () => {
    cy.findByText('Multiple Recipients').should('be.visible');
  });

  it('renders a success snackbar when request is submitted correctly', () => {
    cy.stubRequest({
      method: 'POST',
      url: '/api/v1/data-privacy/rtbf-request',
      fixture: 'data-privacy/200.post.json',
    });
    cy.get('[value="rtbf"]').check({ force: true });
    const exampleCSV = 'data-privacy/fake-list.csv';

    cy.fixture(exampleCSV).then(fileContent => {
      cy.get('[name="file"]').upload({
        fileContent,
        fileName: 'example.csv',
        mimeType: 'text/csv',
      });
    });
    cy.findByText('Submit Request').click();
    cy.findAllByText('Request Saved').should('be.visible');
  });

  it('renders error modal when list is invalid', () => {
    cy.stubRequest({
      method: 'POST',
      statusCode: 400,
      url: '/api/v1/data-privacy/rtbf-request',
      fixture: 'data-privacy/400.post.invalid-list.json',
    });
    const exampleCSV = 'data-privacy/fake-list.csv';
    cy.get('[value="rtbf"]').check({ force: true });
    cy.fixture(exampleCSV).then(fileContent => {
      cy.get('[name="file"]').upload({
        fileContent,
        fileName: 'example.csv',
        mimeType: 'text/csv',
      });
    });
    cy.findByText('Submit Request').click();
    cy.findAllByText('Upload Error').should('be.visible');
    cy.findByText('Download List').click();
    cy.findAllByText('Upload Error').should('not.be.visible');
  });
});
