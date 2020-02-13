const PAGE_URL = '/alerts/details/2';
const API_URL = '/api/v1/alerts/2';

describe('The alerts details pages', () => {
  beforeEach(() => {
    cy.stubAuth();
    cy.login({ isStubbed: true });

    cy.stubRequest({
      url: API_URL,
      fixture: 'alerts/2/200.get.json',
    });
  });

  it('renders with a relevant page title', () => {
    cy.visit(PAGE_URL);

    cy.title().should('include', 'Alert Details | Alerts');
    cy.findByText('Alert Details').should('be.visible');
  });
});
