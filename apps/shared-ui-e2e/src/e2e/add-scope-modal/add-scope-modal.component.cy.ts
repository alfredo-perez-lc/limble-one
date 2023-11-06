describe('shared-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=addscopemodalcomponent--primary'));
  it('should render the component', () => {
    cy.get('l-add-scope-modal').should('exist');
  });
});
