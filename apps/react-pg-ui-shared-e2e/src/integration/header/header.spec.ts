describe('react-pg-ui-shared: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary&knob-title=Header'));

    it('should render the component', () => {
      cy.get('.MuiToolbar-root').should('contain', 'Header');
    });
});
