# Playwright Demo Tests

This project contains automated end-to-end tests for [The Internet](https://the-internet.herokuapp.com/) demo website, created using **Playwright Test Framework**.

## 📦 Tech Stack

- **Node.js** - JavaScript runtime
- **Playwright** - End-to-end testing framework
- **Page Object Model (POM)** - Design pattern for test organization

## 📁 Project Structure

```
playwright-demo-tests/
├── pages/                    # Page Object Model classes
│   ├── ContextMenuPage.js
│   ├── DigestAuthPage.js
│   ├── EntryAdPage.js
│   └── InputsPage.js
├── tests/                    # Test specifications
│   ├── brokenimages.spec.js
│   ├── chalengingdom.spec.js
│   ├── checkboxes.spec.js
│   ├── context_menu.spec.js
│   ├── digest_auth.spec.js
│   ├── drag_and_drop.spec.js
│   ├── dropdown.spec.js
│   ├── dynamic_controls.spec.js
│   ├── entry_ad.spec.js
│   ├── form.spec.js
│   ├── horizontal_slider.spec.js
│   ├── hovers.spec.js
│   ├── inputs.spec.js
│   ├── java_script_alerts.spec.js
│   ├── login.spec.js
│   ├── navigation.spec.js
│   ├── redirect_link.spec.js
│   └── status_codes.spec.js
├── playwright.config.js      # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## 🏗️ Architecture

This project follows the **Page Object Model (POM)** design pattern:

- **Page Objects** (`pages/`): Encapsulate page-specific logic, selectors, and actions
- **Test Specs** (`tests/`): Contain test cases that use page objects to interact with the application

### Benefits of POM:
- ✅ Reusability: Page objects can be reused across multiple tests
- ✅ Maintainability: Changes to UI elements only require updates in page objects
- ✅ Readability: Tests are more readable and focused on test logic
- ✅ Separation of concerns: UI logic is separated from test logic

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aleon120894/playwright-demo-tests.git
cd playwright-demo-tests
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Run a specific test file
```bash
npx playwright test tests/login.spec.js
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### View test report
After running tests, an HTML report is generated. To view it:
```bash
npx playwright show-report
```

## 📊 Test Coverage

The project includes **84 test cases** covering various UI components and scenarios:

### Test Categories:

- ✅ **Authentication**
  - Form authentication
  - Digest authentication

- ✅ **Form Elements**
  - Input fields (numeric input handling)
  - Checkboxes
  - Dropdowns
  - Horizontal slider

- ✅ **Dynamic Content**
  - Dynamic controls (add/remove elements)
  - Entry ad modal
  - Disappearing elements

- ✅ **Interactions**
  - Drag and drop
  - Hovers
  - Context menu
  - JavaScript alerts

- ✅ **Navigation**
  - Page navigation
  - Redirect links
  - Status codes

- ✅ **Other**
  - Broken images
  - Challenging DOM
  - File upload/download

### Browsers Tested:
- ✅ Chromium
- ✅ Firefox
- ⏸️ WebKit (configured but commented out)

## 🌐 Test Application

All automated tests are written against the demo site:

🔗 **[The Internet](https://the-internet.herokuapp.com/)**

This is a well-known test application that provides different UI components and scenarios for practicing UI automation. It's commonly used with testing tools like Playwright, Selenium, and Cypress.

## ⚙️ Configuration

The project uses `playwright.config.js` for configuration:

- **Base URL**: `https://the-internet.herokuapp.com`
- **Test Directory**: `./tests`
- **Reporters**: HTML reporter (with screenshots and videos on failure)
- **Parallel Execution**: Enabled
- **Retries**: 2 retries on CI, 0 locally
- **Trace**: Collected on first retry

## 📝 Best Practices Implemented

1. **Page Object Model**: UI logic is encapsulated in page objects
2. **Async/Await**: Proper handling of asynchronous operations
3. **Locator-based Assertions**: Using Playwright's built-in retry logic for stability
4. **Test Organization**: Tests are grouped by functionality
5. **Error Handling**: Screenshots and videos captured on test failures
6. **Cross-browser Testing**: Tests run on multiple browsers

## 🐛 Troubleshooting

### Tests failing due to timing issues?
- The project uses Playwright's locator-based assertions which include automatic retry logic
- Page objects use `await` properly for all async operations

### Browser not found?
```bash
npx playwright install
```

### View test execution videos?
Check the `test-results/` directory after test failures, or use:
```bash
npx playwright show-report
```

## 📄 License

ISC

## 👤 Author

Created as a demonstration project for Playwright automation testing.
