import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page/login-page';
import { SearchFunctionPage } from '../../pages/search-page/search-function-page';
import { log } from 'console';
import { searchKeywords } from '../../data/searchData';


let context, page, searchPage;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  const loginPage = new LoginPage(page);
  await test.step('Go to login page', async () => {
    await loginPage.gotoLoginPage();
  });
  await test.step('Login with valid credentials', async () => {
    await loginPage.login('Admin', 'admin123');
  });
  await test.step('Verify the page is redirected to the dashboard', async () => {
    await expect(page).toHaveURL(/dashboard/);
  });
  searchPage = new SearchFunctionPage(page);
});

test.afterEach(async () => {
  await context.close();
});

test('[UI/UX][Positive Case] Verify the Default Sidebar Menu - 12 Menu Item @search @regression @sanity', async () => {
  await test.step('Verify the Default Sidebar Menu', async () => {
    await searchPage.verifyDefaultSidebarMenu();
  });
});

test('[Functional][Positive Case] Search menu then click on the result to navigate to correct page @search @regression @sanity', async () => {
  await test.step('Search with keyword "DASHBOARD"', async () => {
    await searchPage.searchMenu(searchKeywords.dashboard);
  });
  await test.step('Verify the menu results contain the keyword "DASHBOARD"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.dashboard);
  });
  await test.step('Click on the result to navigate to correct page', async () => {
    await searchPage.clickOnResultToNavigateToCorrectPage();
  });

  await test.step('Verify the page is redirected to the correct page', async () => {
    await expect(page).toHaveURL(/dashboard/);
  });
});

test('[Functional][Positive Case] Search with keyword "G" returns 0 menu items @search @regression @sanity', async () => {
  await test.step('Search with keyword "G"', async () => {
    await searchPage.searchMenu(searchKeywords.noResult);
  });
  await test.step('Verify the menu results contain no result with the keyword "G"', async () => {
    await searchPage.verifyNoMenuResults();
  });
});

test('[Functional][Positive Case] Search with keyword "P" returns correct menu item @search @regression', async () => {
  await test.step('Search with keyword "P"', async () => {
    await searchPage.searchMenu(searchKeywords.oneChar);
  });
  await test.step('Verify the menu results contain the keyword "P"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.oneChar);
  });
});

test('[Functional][Positive Case] Search with keyword "PE" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PE"', async () => {
    await searchPage.searchMenu(searchKeywords.twoChar);
  });
  await test.step('Verify the menu results contain the keyword "PE"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.twoChar);
  });
});

test('[Functional][Positive Case] Search with keyword "PER" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PER"', async () => {
    await searchPage.searchMenu(searchKeywords.threeChar);
  });
  await test.step('Verify the menu results contain the keyword "PER"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.threeChar);
  });
});

test('[Functional][Positive Case] Search with keyword "PERF" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PERF"', async () => {
    await searchPage.searchMenu(searchKeywords.fourChar);
  });
  await test.step('Verify the menu results contain the keyword "PERF"', async () => { 
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.fourChar);
  });
}); 

test('[Functional][Positive Case] Search with keyword "PERFO" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PERFO"', async () => {
    await searchPage.searchMenu(searchKeywords.fiveChar);
  });
  await test.step('Verify the menu results contain the keyword "PERFO"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.fiveChar);
  });
});

test('[Functional][Positive Case] Search with keyword "PERFOR" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PERFOR"', async () => {
    await searchPage.searchMenu(searchKeywords.sixChar);
  });
  await test.step('Verify the menu results contain the keyword "PERFOR"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.sixChar);
  });
});

test('[Functional][Positive Case] Search with keyword "PERFORM" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PERFORM"', async () => {
    await searchPage.searchMenu(searchKeywords.sevenChar);
  });
  await test.step('Verify the menu results contain the keyword "PERFORM"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.sevenChar);
  });
});

test('[Functional][Positive Case] Search with keyword "PERFORMA" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PERFORMAN"', async () => {
    await searchPage.searchMenu(searchKeywords.eightChar);
  });
  await test.step('Verify the menu results contain the keyword "PERFORMAN"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.eightChar);
  });
});

test('[Functional][Positive Case] Search with keyword "PERFORMANC" returns correct menu items @search @regression', async () => {
  await test.step('Search with keyword "PERFORMANCE"', async () => {
    await searchPage.searchMenu(searchKeywords.nineChar);
  });
  await test.step('Verify the menu results contain the keyword "PERFORMANC"', async () => {
    await searchPage.verifyMenuResultsContainKeyword(searchKeywords.nineChar);
  });
});






















