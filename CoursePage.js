/PageObjects/CoursesPage
class CoursesPage {
   waitForFilters() {
     cy.get('.cat__section-filter__body', { timeout: 10000 })
       .should('exist');
   }
    applyHRFilter() {
     cy.get('label > span.boxname')
       .contains('HR і рекрутинг')
       .click();
   }
    applyThisWeekFilter() {
     cy.get('.cat__section-filter__body input[type="checkbox"]')
       .first()
       .check({ force: true });
   }
    addFirstCourseToCart() {
     cy.get('.courses__box-left .item__card-title')
       .first()
       .parents('.item__card')
       .find('.buy-button')
       .click({ force: true });
   }
    verifyCourseAdded() {
     cy.get('.popup__title').should('contain', 'Додано'); // example popup title verification
   }
 }
  export default CoursesPage;