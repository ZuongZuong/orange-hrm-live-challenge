import { Page } from '@playwright/test';
import { BasePage } from '../base-pages';

export class LoginPage extends BasePage {
  // Locators
  private usernameInput = '[name="username"]';
  private passwordInput = '[name="password"]';
  private loginButton = 'button[type="submit"]';
  private usernameRequiredMessage = "//input[@placeholder='Username']/ancestor::div[contains(@class, 'oxd-input-group')] //span";
  private passwordRequiredMessage = "//input[@placeholder='Password']/ancestor::div[contains(@class, 'oxd-input-group')] //span";
  private invalidCredentialsMessage = "//p[text()='Invalid credentials']";
  private orangehrmLogoBranding = "//div[@class='orangehrm-login-container']/following-sibling::div";
  private orangehrmLogoBrandingImage = "//img[@alt='company-branding']";
  private demoAccount ="//p[text()='Username : Admin']";
  private demoPassword ="//p[text()='Password : admin123']";
  private loginTitle = "//h5[text()='Login']";
  private forgotPasswordLink = "//p[contains(.,'Forgot your password?')]";
  private firstCopyRightText = "//p[text()='OrangeHRM OS 5.7']";
  private secondCopyRightText = "//p[text()='OrangeHRM OS 5.7']/following-sibling::p";
  private footerMenuLink(name: string) {
    return `//div[@class='orangehrm-login-footer-sm'] //a[@href='${name}']`;
  }
  private linkedInUrl = "https://www.linkedin.com/company/orangehrm/mycompany/";
  private facebookUrl = "https://www.facebook.com/OrangeHRM/";
  private twitterUrl = "https://x.com/orangehrm?lang=en";
  private youtubeUrl = "https://www.youtube.com/c/OrangeHRMInc";
  constructor(page: Page) {
    super(page);
  }

  // Actions
  async login(username: string, password: string): Promise<void> {
    await this.waitAndFill(this.usernameInput, username);
    await this.waitAndFill(this.passwordInput, password);
    await this.waitAndClick(this.loginButton);
    await this.waitForTimeout(2000);
  }

  async gotoLoginPage(): Promise<void> {
    const baseUrl = process.env.BASE_URL;
    if (!process.env.BASE_URL) throw new Error('BASE_URL is not defined');
    await this.page.goto(process.env.BASE_URL);
    await this.waitForTimeout(2000); 
  }
  async verifyInvalidCredentialsMessage(text: string): Promise<void> {
    await this.verifyTextContent(this.invalidCredentialsMessage, text);
  }

  async verifyUsernameRequiredMessage(text: string): Promise<void> {
    await this.verifyTextContent(this.usernameRequiredMessage, text);
  }

  async verifyPasswordRequiredMessage(text: string): Promise<void> {
    await this.verifyTextContent(this.passwordRequiredMessage, text);
  }

  async isOrangehrmLogoBrandingVisible(): Promise<void> {
    await this.verifyElementVisible(this.orangehrmLogoBranding);
  }

  async isOrangehrmLogoBrandingImageVisible(): Promise<void> {
    await this.verifyElementVisible(this.orangehrmLogoBrandingImage);
  }

  async isDemoAccountTextCorrect(): Promise<boolean> {
    const demoAccountText = await this.waitAndGetText(this.demoAccount);
    const demoPasswordText = await this.waitAndGetText(this.demoPassword);
    return (
      demoAccountText === 'Username : Admin' &&
      demoPasswordText === 'Password : admin123'
    );
  }

  async getUsernamePlaceholder() {
    return this.page.getAttribute(this.usernameInput, 'placeholder');
  }
  
  async getPasswordPlaceholder() {
    return this.page.getAttribute(this.passwordInput, 'placeholder');
  }

  async isUsernameAndPasswordPlaceholderCorrect(): Promise<boolean> {
    const usernamePlaceholder = await this.getUsernamePlaceholder();
    const passwordPlaceholder = await this.getPasswordPlaceholder();
    return (
      usernamePlaceholder === 'Username' &&
      passwordPlaceholder === 'Password'
    );
  }

  async isLoginTitleVisible(): Promise<boolean> {
    const loginTitle = await this.waitAndGetText(this.loginTitle);
    return loginTitle === 'Login';
  }

  async isForgotPasswordLinkVisible(): Promise<boolean> {
    const forgotPasswordLink = await this.waitAndGetText(this.forgotPasswordLink);
    return forgotPasswordLink === 'Forgot your password?';
  }

  async isCopyRightTextVisible(): Promise<boolean> {
    const firstCopyRightText = await this.waitAndGetText(this.firstCopyRightText);
    const secondCopyRightText = await this.waitAndGetText(this.secondCopyRightText);
    return (
      firstCopyRightText === 'OrangeHRM OS 5.7' &&
      secondCopyRightText === '© 2005 - 2025 OrangeHRM, Inc. All rights reserved.'
    );
  }

  async isElementClickable(element: string): Promise<boolean> {
    await this.verifyElementClickable(this.footerMenuLink(element));
    return true;
  }

  async isFooterIconVisible(url: string): Promise<boolean> {
    await this.verifyElementVisible(this.footerMenuLink(url));
    return true;
  }
}
