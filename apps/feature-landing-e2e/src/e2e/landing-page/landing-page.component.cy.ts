describe('feature-landing', () => {
  beforeEach(() => cy.visit('/iframe.html?id=landingpagecomponent--primary'));
  it('should render the component', () => {
    cy.get('app-landing-page').should('exist');
  });
});
