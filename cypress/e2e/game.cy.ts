describe('Game', () => {
  const baseUrl = Cypress.env('baseUrl');

  it('should allows user to select game mode', () => {
    cy.visit(baseUrl + '/mode');
    cy.selectGameMode('Starships');
  });

  it('should allows user to start and play game', () => {
    const userName = 'Test User';
    cy.visit(baseUrl + '/settings');
    cy.setUserName(userName);
    cy.visit(baseUrl + '/mode');
    cy.selectGameMode('Starships');
    cy.contains(userName).should('exist');
    cy.get('button').contains('Fight').click();
    cy.wait(7000);
    c;
  });
});
