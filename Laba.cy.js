describe('Laba website Tests', () => {
  const mainPageUrl = 'https://laba.ua/';

  beforeEach(() => {
    cy.visit(mainPageUrl);

    // Accept cookies (if any)
    cy.get('body').then(($body) => {
      if ($body.find('#cookie-show').length > 0) {
        cy.get('#cookie-show', { timeout: 20000 })
          .click();
      }
    });
  });

  it('Try to submit the HR course first, if it falls, go back to Business & Management and order it', () => {
    // Open hamburger menu
    cy.get('#nav-bars', { timeout: 10000 })
      .click();

    // Click on "Курси"
    cy.get('a[href="/lecture"]', { timeout: 10000 })
      .contains('Курси')
      .click();

    // Wait for filter section
    cy.get('.cat__section-filter__body', { timeout: 10000 })
      .should('be.visible');

    // Apply "HR і рекрутинг" + "this month" filters
    cy.contains('label', 'HR і рекрутинг')
      .find('input[type="checkbox"]')
      .check({ force: true });

    cy.contains('label', 'цього місяця')
      .find('input[type="checkbox"]')
      .check({ force: true });

    // Apply filters
    cy.get('button.filter__apply-btn', { timeout: 10000 })
      .click({ force: true });

    // Check if "HR і рекрутинг" has results
    cy.get('body').then(() => {
      cy.get('div.item__card', { timeout: 10000 }).then($cards => {
        if ($cards.length > 0) {
           cy.log('HR course(s) found — opening first one');

          // Open "HR і рекрутинг" course in a new page
          cy.get('div.item__card')
            .first()
            .as('firstCourse');

           cy.get('@firstCourse')
             .scrollIntoView()
             .should('exist')
             .click();

        } else {
          cy.log('No HR courses — trying Business & Management');

          // Uncheck HR
          cy.contains('label', 'HR і рекрутинг')
            .find('input[type="checkbox"]')
            .uncheck({ force: true });

          // Apply "Бізнес і менеджмент" filter
          cy.contains('label', 'Бізнес і менеджмент')
            .find('input[type="checkbox"]')
            .check({ force: true });

          // Apply filter again
          cy.get('button.filter__apply-btn', { timeout: 10000 })
            .click({ force: true });

          // Wait for course cards to appear
          cy.get('div.item__card', { timeout: 10000 })
            .should('have.length.greaterThan', 0);

          // Click on first course to go to details page
          cy.get('div.item__card', { timeout: 10000 })
            .first()
            .scrollIntoView()
            .click();

          // On course details page, click "Order" button
          cy.get('body > div.wrapper > section.header.header--scrolled > div > div.header__action > a', { timeout: 10000 })
            .should('be.visible')
            .click();
        }
      });
    });
  });
});
