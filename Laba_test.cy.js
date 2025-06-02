// cypress/e2e/laba_test.spec.cy.js
import MainPage from '../support/MainPage';
import CoursesPage from '../support/CoursesPage';

describe('Laba website Tests', () => {
  const mainPage = new MainPage();
  //const coursesPage = new CoursesPage();

  beforeEach(() => {
    mainPage.visit();
    mainPage.acceptCookies();
  });

  it('displays menu at the main page and applies filters', () => {
    mainPage.openMenu();
    mainPage.clickCourses();

    CoursesPage.waitForFilters();
    CoursesPage.applyHRFilter();
    CoursesPage.applyThisWeekFilter();
    CoursesPage.addFirstCourseToCart();
    CoursesPage.verifyCourseAdded();
  });
});