// cypress/e2e/laba_test.spec.cy.js
import MainPage from '../support/MainPage.js';
import CoursesPage from 'Users/nataliiapyvovarenko/Desktop/QA/cypress-example-Laba_test/cypress/cypress/support/CoursesPage.js';

describe('Laba website Tests', () => {
  const mainPage = new MainPage();
  const coursesPage = new CoursesPage();

  beforeEach(() => {
    mainPage.visit();
    mainPage.acceptCookies();
  });

  it('displays menu at the main page and applies filters', () => {
    mainPage.openMenu();
    mainPage.clickCourses();

    coursesPage.waitForFilters();
    coursesPage.applyHRFilter();
    coursesPage.applyThisWeekFilter();
    coursesPage.addFirstCourseToCart();
    coursesPage.verifyCourseAdded();
  });
});