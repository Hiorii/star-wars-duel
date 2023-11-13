Cypress.Commands.add('selectGameMode', (gameMode) => {
  cy.contains(gameMode).should('exist');
  cy.contains(gameMode).click();
  cy.contains('Select').click({ force: true });
  cy.url().should('include', '/game');
});

Cypress.Commands.add('setUserName', (userName) => {
  cy.clearLocalStorage('userName').then(() => {
    cy.get('input[name="userName"]').should('exist');
  });

  const testUserName = userName;
  cy.get('input[name="userName"]').type(testUserName);
  cy.contains('button', 'Save').click();

  cy.contains('Your name: ' + testUserName).should('exist');

  cy.window().then((win) => {
    win.localStorage.setItem('userName', userName);
  });
  cy.reload();

  cy.contains('Your name: ' + userName).should('exist');
});
