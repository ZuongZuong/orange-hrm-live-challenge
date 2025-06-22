import { expect, Page } from '@playwright/test';
import { BasePage } from '../base-pages';

export class SearchFunctionPage extends BasePage {
  private searchInput = 'input[placeholder="Search"]';
  private menuList = '//a[contains(@class, "oxd-main-menu-item")]'; 

  constructor(page: Page) {
    super(page);
  }

  async searchMenu(keyword: string) {
    await this.waitAndClick(this.searchInput);
    await this.waitAndFill(this.searchInput, ''); // Clear previous value
    if (keyword) {
      await this.waitAndFill(this.searchInput, keyword);
    }
    // Wait for the menu to update
    await this.page.waitForTimeout(200);
  }

  async countOfListMenu(): Promise<number> {
    return this.countNumberOfElement(this.menuList);
  }

  async verifyDefaultSidebarMenu(): Promise<void> {
    const numberOfMenu = await this.countOfListMenu();
    await expect(numberOfMenu).toEqual(12);
  }

  async verifyNoMenuResults(): Promise<void> {
    const numberOfMenu = await this.countOfListMenu();
    await expect(numberOfMenu).toEqual(0);
  }

  async verifyMenuResultsContainKeyword(keyword: string): Promise<void> {
    const results = await this.page.locator(this.menuList).allTextContents();
    for (const item of results) {
      expect(item.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  async clickOnResultToNavigateToCorrectPage(): Promise<void> {
    await this.waitAndClick(this.menuList);
  }
}