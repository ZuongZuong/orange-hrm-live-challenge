import { expect, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly localization: any;

  constructor(page: Page) {
    this.page = page;
  }

  /* ============ Methods =============== */

  async goto(path: string) {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) throw new Error('BASE_URL is not defined in environment variables');
    await this.page.goto(`${process.env.BASE_URL}`, 
    {
      waitUntil: "domcontentloaded",
    });
  }

  async waitForTimeout(time: number) {
    await this.page.waitForTimeout(time);
  }

  async countNumberOfElement(locator: string): Promise<number> {
    return this.page.locator(locator).count();
  }
  
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitAndClick(locator: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.click();
  }

  async verifyTextContent(locator: string, text: string) {
    let elementText = await this.page.textContent(locator);
    if (elementText != null) {
      elementText = elementText.trim();
      expect(elementText).toContain(text);
    }
  }

  async verifyElementClickable(locator: string, index: number = 0): Promise<void> {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({ state: 'visible' });
    await expect(element).toBeEnabled();
    await expect(element).toBeVisible();
  }

  async verifyBackgroundColor(
    locator: string,
    color: string,
    index: number = 0
  ) {
    let element = this.page.locator(locator).nth(index);
    const actualColor = await element.evaluate((value) => {
      return window
        .getComputedStyle(value)
        .getPropertyValue("background-color");
    });
    expect(color).toBe(actualColor);
  }

  async waitAndFill(locator: string, value: string, index: number = 0) {
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.fill(value);
  }

  async waitAndVerifyText(locator: string, text: string, index: number = 0) {
    const element = this.page
      .locator(locator, {
        hasText: `/^${text}$/g`,
      })
      .nth(index);
    await element.waitFor({
      state: "visible",
    });
  }

  async waitAndGetText(
    locator: string,
    index: number = 0
  ): Promise<string | null> {
    const element = this.page.locator(locator).nth(index);
    const isVisible = await element.isVisible();
    if (!isVisible) {
      return null;
    }
    let elementText = await element.innerText();
    if (elementText === null) {
      return "Element Text is null, Pls check element locator or its textContent";
    } else {
      return elementText;
    }
  }

  /*==================Verification==============*/

  async verifyElementVisible(
    locator: string,
    index: number = 0,
    timeout?: number
  ) {
    const element = this.page.locator(locator).nth(index);
    if (timeout) {
      await expect(element).toBeVisible({ timeout: timeout });
    } else {
      await expect(element).toBeVisible();
    }
  }

  async verifyElementDisabled(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect(element).toBeDisabled({ timeout: timeout });
    } else await expect(element).toBeDisabled({ timeout: timeout });
  }
}
