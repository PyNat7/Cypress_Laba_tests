describe('Laba website Tests', () => {
  const mainPageUrl = 'https://laba.ua/';

  beforeEach(() => {
    cy.visit(mainPageUrl);  // Visit the main page

    // Accept cookies if the button exists
    cy.get('body').then(($body) => {
      if ($body.find('#cookie-show').length > 0) {
        cy.get('#cookie-show', { timeout: 10000 }).click();
      }
    });
  });

  it('displays menu at the main page and applies filters', () => {
    // Open the hamburger menu
    cy.get('#nav-bars', { timeout: 10000 })
      .click();

    // Click on the 'Курси' link in the navigation
    cy.get('a[href="/lecture"]', { timeout: 10000 })
      .contains('Курси')
      .click();

    // Wait for filters section to be visible
    cy.get('.cat__section-filter__body', { timeout: 10000 }).should('be.visible');

    // Apply HR and Recruiters courses filter
     cy.contains('label', 'HR і рекрутинг')
      .find('input[type="checkbox"]')
      .check({ force: true });

    // Apply the filter for courses "starting this week"
    cy.get('.cat__section-filter__body input[type="checkbox"]')
      .first()
      .check({ force: true });

    // Wait for filtered results to update
    cy.wait(2000); // consider using better sync logic if available

    // Add the first course to the cart
    cy.get('.courses__box-left .item__card-title', { timeout: 10000 })
      .first()
      .scrollIntoView()
      .parents('.item__card')
      .find('.buy-button')
      .click({ force: true });

    // Check the course is added to the cart
    cy.get('.popup__title', { timeout: 10000 })
      .should('contain', 'Додано');
  });
});
