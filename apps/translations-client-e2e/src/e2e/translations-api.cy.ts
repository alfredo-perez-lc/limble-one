describe('Translations API', () => {
  it('should add a new phrase with translations', () => {
    cy.api('http://localhost:3000/languages').then((response) => {
      cy.log(response.body);
    });
    cy.contains('English').should('exist');
    cy.contains('German').should('exist');
    cy.contains('Spanish').should('exist');
  });
});
