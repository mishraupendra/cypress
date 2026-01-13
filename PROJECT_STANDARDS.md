# Project Organization & Standards

## Standard Cypress Project Structure

```
CypressRS/
├── .vscode/                    # VS Code workspace settings
│   └── settings.json          # Project-specific editor config
├── cypress/
│   ├── downloads/             # Downloaded files during tests
│   ├── e2e/                   # ✅ Modern: Test files (use this)
│   │   ├── auth/
│   │   │   ├── login.cy.js
│   │   │   └── signup.cy.js
│   │   ├── dashboard/
│   │   │   └── dashboard.cy.js
│   │   └── api/
│   │       └── api-tests.cy.js
│   ├── integrations/          # ⚠️ Legacy: Old structure (migrate to e2e/)
│   ├── fixtures/              # Test data (JSON files)
│   │   ├── users.json
│   │   ├── products.json
│   │   └── example.json
│   ├── support/               # Reusable code
│   │   ├── commands.js        # Custom Cypress commands
│   │   ├── e2e.js            # Runs before all tests
│   │   ├── selectors.js       # CSS selectors as constants
│   │   └── helpers.js         # Utility functions
│   ├── screenshots/           # Auto-generated (gitignored)
│   └── videos/                # Auto-generated (gitignored)
├── node_modules/              # Dependencies (gitignored)
├── .gitignore                 # Files to exclude from git
├── cypress.config.js          # Cypress configuration
├── package.json               # Project dependencies & scripts
├── package-lock.json          # Locked dependency versions
├── README.md                  # Project documentation
├── CSS_SELECTOR_GUIDE.md      # Quick reference guide
└── CONTRIBUTING.md            # Contribution guidelines (optional)
```

## File Naming Conventions

### Test Files
- **Pattern:** `feature-name.cy.js` or `feature-name.spec.js`
- **Examples:**
  - `login.cy.js`
  - `user-registration.cy.js`
  - `checkout-flow.cy.js`
  - `api-products.cy.js`

### Fixtures
- **Pattern:** `kebab-case.json`
- **Examples:**
  - `user-data.json`
  - `product-list.json`
  - `test-credentials.json`

### Support Files
- **Pattern:** `kebab-case.js` or `camelCase.js`
- **Examples:**
  - `custom-commands.js`
  - `page-objects.js`
  - `selectors.js`

## Standard Rules & Best Practices

### 1. **Separation of Concerns**

#### Store CSS Selectors Separately
Create `cypress/support/selectors.js`:
```javascript
// cypress/support/selectors.js
export const loginSelectors = {
  usernameInput: '[data-cy="username"]',
  passwordInput: '[data-cy="password"]',
  submitButton: '[data-cy="submit"]',
  errorMessage: '.error-message'
}

export const dashboardSelectors = {
  header: '[data-cy="dashboard-header"]',
  logoutButton: '[data-cy="logout"]'
}
```

Use in tests:
```javascript
import { loginSelectors } from '../support/selectors'

cy.get(loginSelectors.usernameInput).type('user')
```

#### Store Test Data in Fixtures
```javascript
// cypress/fixtures/users.json
{
  "validUser": {
    "username": "testuser",
    "password": "Test@123"
  },
  "invalidUser": {
    "username": "invalid",
    "password": "wrong"
  }
}

// In test
cy.fixture('users').then((users) => {
  cy.get('[data-cy="username"]').type(users.validUser.username)
})
```

### 2. **Custom Commands**

Create reusable commands in `cypress/support/commands.js`:
```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-cy="username"]').type(username)
  cy.get('[data-cy="password"]').type(password)
  cy.get('[data-cy="submit"]').click()
})

// Usage in test
cy.login('user@test.com', 'password123')
```

### 3. **Environment Variables**

Store sensitive data in `cypress.env.json` (gitignored):
```json
{
  "baseUrl": "https://example.com",
  "apiKey": "your-api-key",
  "testUser": {
    "email": "test@example.com",
    "password": "secret"
  }
}
```

Access in tests:
```javascript
cy.visit(Cypress.env('baseUrl'))
const apiKey = Cypress.env('apiKey')
```

### 4. **Test Organization Patterns**

#### Group Related Tests
```javascript
describe('User Authentication', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  context('Valid Credentials', () => {
    it('should login successfully', () => {
      // test code
    })
  })

  context('Invalid Credentials', () => {
    it('should show error message', () => {
      // test code
    })
  })
})
```

#### Use Page Object Pattern
```javascript
// cypress/support/pages/LoginPage.js
export class LoginPage {
  visit() {
    cy.visit('/login')
  }

  fillUsername(username) {
    cy.get('[data-cy="username"]').type(username)
    return this
  }

  fillPassword(password) {
    cy.get('[data-cy="password"]').type(password)
    return this
  }

  submit() {
    cy.get('[data-cy="submit"]').click()
  }
}

// In test
import { LoginPage } from '../support/pages/LoginPage'

const loginPage = new LoginPage()
loginPage.visit()
  .fillUsername('user')
  .fillPassword('pass')
  .submit()
```

## Version Control Standards

### .gitignore (Already created)
```
node_modules/
cypress/screenshots/
cypress/videos/
cypress/downloads/
*.log
.DS_Store
cypress.env.json
```

### Commit Message Format
```
<type>: <subject>

<body>

Types:
- feat: New feature
- fix: Bug fix
- test: Add or update tests
- refactor: Code refactoring
- docs: Documentation changes
- chore: Maintenance tasks

Examples:
feat: add login test with valid credentials
fix: update selector for submit button
test: add edge cases for user registration
refactor: extract selectors to separate file
docs: update CSS selector guide
```

## Code Style Standards

### 1. Naming Conventions
- **Variables:** `camelCase` - `userName`, `loginButton`
- **Constants:** `UPPER_SNAKE_CASE` - `BASE_URL`, `TIMEOUT_MS`
- **Files:** `kebab-case.cy.js` - `user-login.cy.js`
- **Test suites:** Descriptive strings - `'User Authentication'`

### 2. Code Formatting
```javascript
// Use consistent indentation (2 or 4 spaces)
// Add blank lines between logical blocks
// Keep lines under 100 characters

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
    cy.visit('/page')
  })

  it('should do something specific', () => {
    // Arrange
    const testData = 'test'

    // Act
    cy.get('[data-cy="input"]').type(testData)
    cy.get('[data-cy="submit"]').click()

    // Assert
    cy.get('[data-cy="result"]').should('contain', testData)
  })
})
```

### 3. Comments
```javascript
// Good: Explain WHY, not WHAT
// Wait for API call to complete before checking results
cy.wait('@apiCall')

// Bad: States the obvious
// Click the button
cy.get('button').click()
```

## Documentation Standards

### README.md Structure
1. Project overview
2. Prerequisites
3. Installation steps
4. How to run tests
5. Project structure
6. Contributing guidelines
7. Common issues & solutions

### File Headers
```javascript
/**
 * User Login Tests
 * 
 * Tests user authentication functionality including:
 * - Valid login flow
 * - Invalid credentials handling
 * - Password reset functionality
 * 
 * @author Your Name
 * @updated 2026-01-12
 */
```

## Maintenance Rules

### 1. Keep Dependencies Updated
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update Cypress
npm install cypress@latest --save-dev
```

### 2. Run Tests Regularly
- Before commits
- In CI/CD pipeline
- Daily/weekly full test suite

### 3. Review & Refactor
- Remove duplicate code
- Update selectors when UI changes
- Archive obsolete tests
- Keep fixtures current

## Alignment & Consistency Checklist

- [ ] All test files in `cypress/e2e/` organized by feature
- [ ] Selectors extracted to `cypress/support/selectors.js`
- [ ] Test data in `cypress/fixtures/*.json`
- [ ] Custom commands in `cypress/support/commands.js`
- [ ] `.gitignore` excludes generated files
- [ ] Consistent naming conventions
- [ ] README.md is up-to-date
- [ ] No hardcoded credentials
- [ ] Tests are independent (no dependencies)
- [ ] Meaningful commit messages

## Quick Commands Reference

```bash
# Run all tests
npm run cypress:run

# Open Cypress UI
npm run cypress:open

# Run specific test
npx cypress run --spec "cypress/e2e/login.cy.js"

# Run tests in specific browser
npx cypress run --browser chrome

# Check for issues
npm audit
```

---

**Remember:** Consistency is key. Follow these standards across all files to maintain a clean, professional, and maintainable codebase.
