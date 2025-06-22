Automated end-to-end tests for OrangeHRM Demo using Playwright and TypeScript.
playwright-automation-framework/
├── .github/
│   └── workflows/
│       └── ci.yml                        # GitHub Actions for CI/CD
├── tests/
│   ├── login.spec.ts                    # login test spec
│   └── search-menu-spec.ts              # search function test spec
├── pages/                               # POM: Page Object Models
│   ├── base-pages.ts
│   └── login-page.ts
│   └── search-function-page.ts
│   └── dashboard-page.ts
├── data/                               # Test data
│   └── account.ts                      
│   └── searchData.ts
├── env/
│   └── .env.test                       # Cross environment setup for test
├── helper/
│   └── global-setup.ts                 # Cross environment setup for test
├── playwright.config.ts                # Playwright configuration (cross-browser, retries, reporter)
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Dependencies and scripts
├── README.md

🛠️ Tech Stack
    Language: TypeScript
    Framework: Playwright
    Design Pattern: Page Object Model (POM)
    Cross-Environment: Managed by cross-env
    Reporting: Playwright HTML & Allure
Tags:
    @login – Login page tests
    @search – Search page tests
    @sanity – Sanity suite
    @regression – Regression suite

# Getting Start
1. [Playwright](https://playwright.dev/)
2. [Execute test parallel](https://playwright.dev/docs/test-parallel)
3. [HTML Report](https://playwright.dev/docs/test-reporters)
4. [Allure Report](https://testersdock.com/allure-playwright/)
5. [Page Object Model](https://playwright.dev/docs/pom)
6. [Cross Environment](https://www.npmjs.com/package/cross-env)

# Installation
The following softwares are required:
- [NodeJS](https://nodejs.org/en/download)
- [JDK 19](https://docs.oracle.com/en/java/javase/18/install/overview-jdk-installation.html)


# Set up
1. CLone this repository to your machine: 
    `git clone https://github.com/harryitester/orange-hrm-live-challenge.git`
    `cd orange-hrm-live-challenge`

2. Running npm install to download and create node_modules section
    `npm install`
    `npm ci`

3. Download playwright supported browsers by below command
    `npx playwright install --with-deps`
For Microsoft Edge (optional)
    `npx playwright install msedge`


4. If "cross-env" cannot be found on your machine, execute below command to install globaly

`npm install -g cross-env`

- Running with specific environment, country by passing the process environments (using country to get the correct localization to navigate or url)

// environment = [test, production(don't have infor), prerelease(don't have infor)]
// scriptFilePath = copy relative path of the test spec file

cross-env test_env=${envionment} npx playwright test ${scriptFilePath}


- Running with specific grep
@login
@search
@sanity
@regression
cross-env test_env=${envionment} npx playwright test ${scriptFilePath} --grep ${grep}


To run all test on local:
    `npm test`


To Run Only Login Tests:
    `npm run test:login`



Run with a Tag (e.g., @new):
    `npx cross-env TEST_ENV=production npx playwright test --grep @new`



To Run with a Specific Environment:
    `npx cross-env TEST_ENV=production npm run test:login`
    `npx cross-env TEST_ENV=test npm run test:login`



To Run with a Specific browser such as `chrome`:
    `cross-env TEST_ENV=test playwright test tests/search/search-menu.spec.ts --project=chromium`


6. Viewing Reports Locally
1. HTML Report
After running tests, open the HTML report:
    `npx playwright show-report test-reports/html`
or open the playwright-report/index.html file in your browser.

2. Allure Report
Generate the Allure Report
`npx allure generate ./test-reports/allure-results --clean -o ./test-reports/allure-report`

Open the Allure Report
    `npx allure open ./allure-report`
This will open the Allure report in your default browser.


7. Running Tests in GitHub Actions (CI)
    Go to your repository on GitHub: https://github.com/harryitester/orange-hrm-live-challenge/actions  
    Select the latest workflow run or dirrect navigate to :https://github.com/harryitester/orange-hrm-live-challenge/actions
    View the job logs for test results.
    Download the Allure report artifact:
    Find the "Artifacts" section (e.g., allure-report-zip).
    Click to download the zip file.
    Unzip and open index.html in your browser to view the report.