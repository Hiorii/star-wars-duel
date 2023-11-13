declare namespace Cypress {
  interface Chainable<Subject> {
    selectGameMode(gameMode: string): Chainable<any>;

    setUserName(userName: string): Chainable<any>;
  }
}
