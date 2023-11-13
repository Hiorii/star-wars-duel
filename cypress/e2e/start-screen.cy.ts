describe('Start Screen Test', () => {
  const baseUrl = Cypress.env('baseUrl');

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('show Start and Settings buttons on start screen', () => {
    cy.contains('button', 'Start').should('be.visible');
    cy.contains('button', 'Settings').should('be.visible');
  });

  it('navigates to game mode selection when Start Game is clicked', () => {
    cy.contains('button', 'Start').click();
    cy.url().should('include', '/mode');
  });

  it('navigates to game mode selection when Start Game is clicked', () => {
    cy.contains('button', 'Settings').click();
    cy.url().should('include', '/settings');
  });
});
