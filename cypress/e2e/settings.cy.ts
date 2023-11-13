describe('Settings', () => {
  const baseUrl = Cypress.env('baseUrl');

  beforeEach(() => {
    cy.visit(baseUrl + '/settings');
  });

  it('allows the user to switch between tabs', () => {
    cy.clearLocalStorage('userName').then(() => {
      cy.get('input[name="userName"]').should('exist');
    });

    cy.contains('General').click();
    cy.contains('Sound:').should('exist');

    cy.contains('User').click();
    cy.get('input[name="userName"]').should('exist');
  });

  it('allows the user to set their name', () => {
    cy.setUserName('Test User');
  });

  it('allows the user to set set music settings', () => {
    cy.clearLocalStorage();
    cy.contains('General').click();
    cy.contains('Sound:').should('exist');

    cy.get('label[for="bb8_cb"]')
      .click()
      .then(() => {
        cy.window().then((win) => {
          expect(win.localStorage.getItem('sound')).to.eq('true');
        });
      });

    cy.get('label[for="bb8_cb"]')
      .click()
      .then(() => {
        cy.window().then((win) => {
          expect(win.localStorage.getItem('sound')).to.eq('false');
        });
      });
  });

  it('should navigate user to start screen when back button is clicked', () => {
    cy.contains('Back to menu').click();
    cy.url().should('include', '/start');
  });
});
