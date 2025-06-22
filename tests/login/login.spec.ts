import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page/login-page';
import { accountData } from '../../data/account'
import { DashboardPage } from '../../pages/dashboard-page/dashboard-page';

let context;
let page;
let loginPage;
let dashboardPage;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await test.step('Go to login page', async () => {
        await loginPage.gotoLoginPage();
    });
});

test.afterEach(async () => {
    await context.close();
});

test('[Functional][Positive Case] Ensure Admin user account login success @login @regression @sanity', async () => {
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(accountData.validUser.username, accountData.validUser.password);
    });

    await test.step('Admin user login success to see the Dashboard as default behavious', async () => {
        await dashboardPage.verifyDashboardPageUrl();
        await dashboardPage.verifyDashboardPageTitle();
    });
});

test('[Functional][Negative Case] Ensure Admin user account login failed with invalid username and password @login @regression', async () => {
    await test.step('Login with invalid username and password', async () => {
        await loginPage.login(accountData.invalidUser.username, accountData.invalidUser.password);
    });

    await test.step('Warning message in red color showing "Invalid credentials" is displayed', async () => {
        const expectedMessage = 'Invalid credentials';
        await loginPage.verifyInvalidCredentialsMessage(expectedMessage);
    });
});

test('[Functional][Negative Case] Ensure Admin user account login failed with invalid username @login @regression', async () => {
    await test.step('Login with invalid username', async () => {
        await loginPage.login(accountData.invalidUser.username, accountData.validUser.password);
    });

    await test.step('Warning message in red color showing "Invalid credentials" is displayed', async () => {
        const expectedMessage = 'Invalid credentials';
        await loginPage.verifyInvalidCredentialsMessage(expectedMessage);
    });
});

test('[Functional][Negative Case] Ensure Admin user account login failed with invalid password @login @regression', async () => {
    await test.step('Login with valid username and invalid password', async () => {
        await loginPage.login(accountData.validUser.username, accountData.invalidUser.password);
    });

    await test.step('Warning message in red color showing "Invalid credentials" is displayed', async () => {
        const expectedMessage = 'Invalid credentials';
        await loginPage.verifyInvalidCredentialsMessage(expectedMessage);
    });
});

test('[Functional][Negative Case] Ensure a user cannot login with blank Username and Password @login @regression', async () => {
    await test.step('Login with empty username and password', async () => {
        await loginPage.login('', '');
    });

    await test.step('Warning message "Required" showing below Username and Password textbox.', async () => {
        const expectedMessage = 'Required';
        await loginPage.verifyUsernameRequiredMessage(expectedMessage);
        await loginPage.verifyPasswordRequiredMessage(expectedMessage);
    });
});

test('[UI/UX][Positive Case] Ensure hint text in Username and Password textbox showing correct as design @login @regression', async () => {

    await test.step('Verify the Hint text in Username and Password textbox showing correct as design', async () => {
        await loginPage.isUsernameAndPasswordPlaceholderCorrect();
    });
});

test('[UI/UX][Positive Case] Ensure the Login component should showing correct as design @login @regression', async () => {

    await test.step('The Login Title showing', async () => {
        await loginPage.isLoginTitleVisible();
    });

    await test.step('Verify "Orangehrm-demo-credentials" page showing correct as design', async () => {
        await loginPage.isDemoAccountTextCorrect();
    });

    await test.step('Verify " Forgot your password?" link text visible', async () => {
        await loginPage.isForgotPasswordLinkVisible();
    });

    await test.step('Verify "OrangeHRM OS 5.7" and "© 2005 - 2025 OrangeHRM, Inc. All rights reserved." text visible', async () => {
        await loginPage.isCopyRightTextVisible();
    });
});