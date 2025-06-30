// PageObjects/MainPage.js
class MainPage {
   visit() {
    cy.visit('https://laba.ua/');
   }
  
   acceptCookies () {
     cy.get('#cookie-show', {timeout: 10000})
       .click()
   }
  
   openMenu() {
     cy.get('#nav-bars')
       .click();
   }
  
   clickCourses() {
     cy.get('a[href="/lecture"]', { timeout: 10000 })
       .contains('Курси')
       .click();
   }
   }
  
   export default MainPage;